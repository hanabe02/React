import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useLocalStorage<ValueType>(key: string, defaultValue: ValueType) {

  // console.log("1 " + key); berry-config-ts
  // console.log("2 " + defaultValue); value 값 들어 있음 {}
  
  // 상태 초기화 : react의 상태 value로 초기화 (초기값 설정하는 코드) setValue 함수 실행시 -> 초기값 덮어 쒸운다.
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    // 로컬 스토리지에서 key 에 해당하는 값을 가져온다.
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
    // 값이 없다(null) : 기본값 defaultValue 실행 아니면 json 문자열을 파싱하여 value 에 설정
  });

  // 로컬 스토리지 변경 감지지
  useEffect(() => {
    const listener = (e: StorageEvent) => {
      // storage 이벤트를 감지 -> 로컬 스토리지가 변경 되었을 때 value 업데이트트
      if (e.storageArea === localStorage && e.key === key) {
        // e.storageArea = 로컬 스토리지가 변경된 경우
        // e.key = 변경된 항목이 현재 훅에서 관리하는 key 와 동일한 경우 
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
        // setValue 함수 실행 새로운 값 -> react 상태(value) 업데이트
      }
    };
    window.addEventListener('storage', listener);
    // 로컬 스토리지 변경 이벤트를 구독한다는 의미미

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue: ValueType) => {
    setValue((currentValue: any) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
