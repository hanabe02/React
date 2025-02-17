import { ReactElement, ReactNode, useEffect, useState } from 'react';

// global styles
import '../styles/globals.css';
import '../scss/style.scss';

// next
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

// third-party
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// project-import
import Loader from 'ui-component/Loader';
import Locales from 'ui-component/Locales';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Notistack from 'ui-component/third-party/Notistack';

import ThemeCustomization from 'themes';
import { getMenu } from 'store/slices/menu';
import { persister, store, dispatch } from 'store';
import { ConfigProvider } from 'contexts/ConfigContext';
import NavigationScroll from 'layout/NavigationScroll';

import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from '../contexts/Auth0Context';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';

// types
type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: LayoutProps;
}

// Component 현재 렌더링할 페이지 컴포넌트를 나타낸다.



function MyApp({ Component, pageProps }: AppProps & Props) {
  // MyApp 은 next.js의 최상위 컴포넌트이다.
  // next.js가 어떤 페이지를 렌더링하든, 모든 페이지는 MyApp을 통해 렌더링 된다.
    // next.js가 내부적으로 현재 요청된 페이지를 component로 전달한다.


  // console.log("현재 렌더링 중인 컴포넌트:", Component.name); // 현재 컴포넌트 이름

  const getLayout = Component.getLayout ?? ((page: any) => page);
    // Component 현재 페이지 컴포넌트를 나타낸다.
    // 페이지 컴포넌트가 getLayout 이라는 메서드를 가지고 있다면, 이를 사용한다.

    // ?? 는 왼쪽 값이 null 또는 undefined일 경우
    // 오른쪽 값을 반환, 즉 Component.getLayout이 정의되지 않았다면, 기본값인 ((page => page)) 함수가 사용됨

    // ((page: any) => page) 
      // 기본적으로 아무 레이아웃도 적용하지 않고 페이지 컴포넌트를 그대로 반환하는 함수이다.
      // getLayout이 정의되지 않은 페이지는 이 기본 함수를 사용해 렌더링 된다.



  // getLayout을 사용해 page를 감싸는 레이아웃을 결정한다.
    // 만약 page에 getLayout이 정의되어 있다면, 해당 getLayout이 호출되어 페이지를 특정 레이아웃으로 감싼다.

    /*
      1. <Component {...pageProps} />
        현재 렌더링할 페이지 컴포넌트(component)를 page 라는 jsx 형태로 받아온다.
      
      2. 
        };
        gatLayout이 반환하는 jsx, 보통 해당 page를 특정 레이아웃 컴포넌트로 감싼 jsx 이다.

      3.
        <Layout variant="minimal">
          <Component {...pageProps} />
        </Layout>
        결과적으로 component(현재 페이지)가 layout(레이아웃 컴포넌트)로 감싸진다.
    
    */
      


  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getMenu()).then(() => {
      setLoading(true);
    });
  }, []);

  // console.log(loading);
  if (!loading) return <Loader />;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConfigProvider>
          <ThemeCustomization>
            <RTLLayout>
              <Locales>
                <NavigationScroll>
                  <AuthProvider> 
                    {/* ㄴ JWTProvider 서버 통신하는 부분 */}
                    <>
                      <Notistack>
                        {getLayout(<Component {...pageProps} />)}
                        <Snackbar />
                      </Notistack>
                    </>
                  </AuthProvider>
                </NavigationScroll>
              </Locales>
            </RTLLayout>
          </ThemeCustomization>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
