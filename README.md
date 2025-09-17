
# React 프로젝트

### UseState
    내부 상태값과 그걸 바꾸는 세터 함수를 만드는 코드

    const [pointName, setPointName] = useState('');
    
    const [pointType, setPointType] = useState('Delivery point');

    useState()는 튜플을 반환하는데 현재 상태값 pointName, pointType

    그 값을 바꾸는 함수(setPointName, setPointType)

    이 초깃값은 "처음 마운트 될 때 한 번만" 사용 된다. 아휴 재렌더에 서는 useState9'') 의 문자열을 다시 읽지 않아

    초기화 가 자동으로 되는게 아니라, 우리가 세터로 직접 빈 값을 넣어줘야 한다.

    setPointName(''); // 포인터 이름을 빈 문자열로 되돌림

    setDrawMode('none'); // 모드도 기본값으로 되돌림

