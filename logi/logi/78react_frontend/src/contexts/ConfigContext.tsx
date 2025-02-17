import { createContext, ReactNode } from 'react';

// project import
import defaultConfig from 'config';
import useLocalStorage from 'hooks/useLocalStorage';

// types
import { PaletteMode } from '@mui/material';
import { CustomizationProps } from 'types/config';

// initial state = 직접 정의한 객체이다. 코드 내에서 개발자가 직접 선언하고 이를 createContext 에 넘긴다. 
const initialState: CustomizationProps = {
  ...defaultConfig, // 애플리케이션의 초기 설정값이 안에 정의 되어 있다. 안에 타고 들어가면 layout 값이 정의 되어 있음음
  onChangeLayout: () => {},
  onChangeDrawer: () => {},
  onChangeMenuType: () => {},
  onChangePresetColor: () => {},
  onChangeLocale: () => {},
  onChangeRTL: () => {},
  onChangeContainer: () => {},
  onChangeFontFamily: () => {},
  onChangeBorderRadius: () => {},
  onChangeOutlinedField: () => {},
  onReset: () => {}
};


// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);
// initialState : createContext 함수에 전달되는 매개변수, 컨텍스트의 초기값

type ConfigProviderProps = {
  children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
  // useLocalStorage : 로컬 스토리지와 react 상태를 연동하는 훅
    // 1. 초기값 설정 및 로컬 스토리지 읽기 (로컬 스토리지에 저장된 값을 가져오거나 값이 없으면 기본값을 설정한다.)
    // 2. 값 업데이트 (상태를 변경하면 로컬 스토리지에도 값을 업데이트 한다.)
    // 3. 스토리지 이벤트 감지 (다른 탭이나 창에서 로컬 스토리지가 변경되었을 때, 해당 변경 사항을 동기화 한다.)
  const [config, setConfig] = useLocalStorage('berry-config-ts', {
    layout: initialState.layout, // initialState 객체 안에 layout 값을 가져온다는 의미이다. 
    drawerType: initialState.drawerType,
    fontFamily: initialState.fontFamily,
    borderRadius: initialState.borderRadius,
    outlinedFilled: initialState.outlinedFilled,
    navType: initialState.navType,
    presetColor: initialState.presetColor,
    locale: initialState.locale,
    rtlLayout: initialState.rtlLayout
  });


  const onChangeLayout = (layout: string) => {
    setConfig({
      ...config,
      layout
    });
  };

  const onChangeDrawer = (drawerType: string) => {
    setConfig({
      ...config,
      drawerType
    });
  };

  const onChangeMenuType = (navType: PaletteMode) => {
    setConfig({
      ...config,
      navType
    });
  };

  const onChangePresetColor = (presetColor: string) => {
    setConfig({
      ...config,
      presetColor
    });
  };

  const onChangeLocale = (locale: string) => {
    setConfig({
      ...config,
      locale
    });
  };

  const onChangeRTL = (rtlLayout: boolean) => {
    setConfig({
      ...config,
      rtlLayout
    });
  };

  const onChangeContainer = (container: boolean) => {
    setConfig({
      ...config,
      container
    });
  };

  const onChangeFontFamily = (fontFamily: string) => {
    setConfig({
      ...config,
      fontFamily
    });
  };

  const onChangeBorderRadius = (event: Event, newValue: number | number[]) => {
    setConfig({
      ...config,
      borderRadius: newValue as number
    });
  };

  const onChangeOutlinedField = (outlinedFilled: boolean) => {
    setConfig({
      ...config,
      outlinedFilled
    });
  };

  const onReset = () => {
    setConfig({ ...defaultConfig });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeLayout,
        onChangeDrawer,
        onChangeMenuType,
        onChangePresetColor,
        onChangeLocale,
        onChangeRTL,
        onChangeContainer,
        onChangeFontFamily,
        onChangeBorderRadius,
        onChangeOutlinedField,
        onReset
      }}
    >
      {children}
    </ConfigContext.Provider>

  );
}

export { ConfigProvider, ConfigContext };
