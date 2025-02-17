import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// constant

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
import Axios from 'api/logiApi'
import { InitialLoginContextProps, KeyedObject } from 'types';
import { JWTContextType } from 'types/auth';

const chance = new Chance();

// constant
const initialState: InitialLoginContextProps = {
  // InitialLoginContextProps 이것을 통해서 타입을 지정해줘서 타입을 사용할 수 있게 만든다. 
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  // 입력값 serviceToken, 반환값 boolean
  if (!serviceToken) {
    // serviceToken null, undefined 인 경우 
    return false;
  }
  console.log("false 가 아니기 때문에 정상적으로 실행 됨");

  try {
    const decoded: any = jwtDecode(serviceToken); // 디코딩
    if (!decoded.exp) {
      console.error("만료 시간(exp)이 포함되지 않은 토큰:", decoded);
      return false;
    }

    return decoded.exp > Date.now() / 1000; // 현재 시간보다 만료 시간이 큰지 확인
  } catch (error) {
    console.error("토큰 디코딩 오류:", error);
    return false; // 디코딩 실패 시 false 반환
  }
  // 민성 코드 수정 : 코드 2줄 주석 처리리

  // const decoded: KeyedObject = jwtDecode(serviceToken);

    // jwtDecode() 메서드 실행 : 토근을 디코딩하여 정보를 추출하는 함수
    // decoded 타입 설정 KeyedObject
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */

  // return decoded.exp > Date.now() / 1000;

    // decoded.ext
      // 디코딩 된 객체에서 exp(만료 시간) 속성을 읽어온다.
      // jwt 의 exp 속성은 토큰의 만료 시간을 나타내며, 일반적으로 unix 타임 스탬프(초 단위)
      // 형식으로 제공된다.

      // Date.now 현재 시간을 초 단위로 변환한 값과 exp를 비교한다.
      // 만료 시간이 현재 시간보다 크다면, 토큰이 아직 유효하다고 판단
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);
// createContext 
  // react의 context 를 생성하는 함수
  // 초기값으로 null을 설정
    // 이 기본값은 provider가 없는 경우 반환된다.
      // provider 가 없는 경우?
        // provider는 데이터를 공유하는 역할을 하는데
        // 만약 procider로 컴포넌트를 감싸지 않고 useContext(autoContext)를 호출하면, authContext는 기본값 null을 반환한다.

      // provider 가 있는 경우?
        // authContext.Provider는 value 속성으로 데이터를 설정한다.
        // useContext(AuthContext)는 이 데이터를 반환한다.
      

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  /*
  children : 
                    <>
                      <Notistack>
                        {getLayout(<Component {...pageProps} />)}
                        <Snackbar />
                      </Notistack>
                    </>
  
  */
  const [state, dispatch] = useReducer(accountReducer, initialState);

  /*
  useReducer : 
    react애서 상태 관리와 업데이트 로직을 간소화 하기 위해 제공하는 hook
    상태를 업데이트 하는 로직을 분리, reducer 함수로 관리하며, 복잡한 상태 관리에 유용

    state : 현재 상태를 나태낸다.
    dispatch : 상태를 업데이트하기 위해 호출하는 함수
    reducerFunction(accountReducer) : 상태 업데이트 로직을 정의한 함수(리듀서 함수)
    initialState : 초기 상태 값값
  */

  useEffect(() => {
    // useEffect : react 컴포넌트가 렌더링 된 이후에 특정 작업을 수행하도록 만드는 훅
    const init = async () => {
      // init 함수 : 비동기로 선언된 함수로, 컴포넌트가 초기화 될 때 실행되는 로직
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        // localStorage에서 serviceToken이라는 키에 저장된 값을 가져온다.
        const email = window.localStorage.getItem("email");
        const password = window.localStorage.getItem("password");



        // 민성 코드 수정 : 밑에 1줄 주석 처리리
        // if (serviceToken && verifyToken(serviceToken)) {

        if (serviceToken) {
          // verifyToken 서비스 토큰이 유효한지 확인 함수, 
            // 유효 기간 검사나 서명 검증 같은 로직이 포함되어 있다.
          setSession(serviceToken);
          // true 일 경우 setseeion 메서드 실행
          const response = await Axios.post('/login', { email, password });
          // api 요청 사용자 정보 가져온다.
          
          console.log("서버 요청 성공");
          console.log("response : " + response);
          const { user } = response.data;
          // api 응답에서 user 객체 추출
          dispatch({
            // redux 액션을 호출하거나, context api 의 디스패치를 통해 상태를 업데이트 한다.
            type: LOGIN,
            // isLoggedIn 을 true 로 설정, 사용자 정보를 상태에 저장
            payload: {
              isLoggedIn: true,
              // AuthGuard.tsx 에서 useAuth() 메서드를 실행하여 boolean 값인 true 값을 가져온다.
              user
            }
          });
          
        } else {
          // serviceToken 이 없거나 유효하지 않은 경우 상태를 초기화
            // 사용자가 로그아웃 상태로 전환
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const authority = 1;
    // email, password 두 개의 매개변수를 받는다.
    // 사용자 로그인 버튼 클릭시 호출
    try{
      console.log(email);
      console.log(password);
      // const response = await axios.post('/api/account/login', { email, password });

      const response = await Axios.post('/login', { email, password, authority });

      

      console.log("서버 응답:", response);
      console.log("실행 완료");
      

      // 서버 응답 데이터 추출
      const { serviceToken, user, message } = response.data;
      alert(user[0].positionName + " " + user[0].empName + "님 환영합니다. ")
      console.log(serviceToken);
      setSession(serviceToken); // 토큰 저장

      // axios.post 의 역할
        // 클라이언트가 서버로 데이터를 보낼 때 사용하는 Http post 요청이다.
        // api/account/login 이라는 url로 요청을 보낸다.

        // 서버는 요청을 받고, email, password가 유효한지 확인
        // 인증에 성공하면 다음과 같은 응답 데이터를 반환

        // axios.post를 통해 서버의 응답을 기다린후 
        // 서버에서 반환된 데이터를 response 변수에 저장한다.
      
        // + 브라우저에서 응답과 요청이 같이 처리되기 때문에 이것은 csr 이다. 

      // 민성 코드 수정 : 주석처리리
      // const { serviceToken, user } = response.data;
      // 인증 성공시 serviceToken 을 반환한다.
      // 반환된 serviceToken을 클라이언트(react)에 저장

      // 민성 코드 수정 : 주석처리 1줄 
      // setSession(serviceToken);
      // 토큰 저장 로직

      // 민성 코드 수정 : 주석처리 7줄
      // dispatch({
      //   type: LOGIN,
      //   payload: {
      //     isLoggedIn: true,
      //     user
      //   }
      // });

      // 민성 코드 수정 : 주석처리 1줄 추가
      // console.log("정상적으로 출력 됨");

    // 서비스 토큰이 유효한 경우 로그인 성공 처리
    if (user) {
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user,
        },
      });
      console.log("로그인 성공: 환영합니다. ", user[0].empCode + "님.");
    } else {
      // 로그인 실패 처리
      console.error("로그인 실패:", message || "로그인 실패");
      alert(message || "이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    // 예외 처리
    console.error("서버 요청 오류:", error);
    alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");
  }
};

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers!),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email: string) => {};

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
  // ...state 스프레드 연산자로 : 객체의 모든 속성을 펼쳐서 value 객체에 추가하는 역할을 한다.

  // children 으로 전달된 모든 하위 컴포넌트는 UserContext에 접근할 수 있다. JWTContext에 접근할 수 있게 된다. 


  // JWTContext.Provider는 데이터를 제공하는 역할
    // value 속성에 데이터를 전달한다.
      // children으로 감싼 모든 컴포넌트가 이 데이터를 사용할 수 있게 된다.

      // createCOntext로 context 생성
      // jwtcontext.provider로 데이터 전달
      // value 에 데이터 설정
      // value 의 값이 context 값으로 저장됨
      // useContexxt 로 데이터를 가져온다.

      // useContext(jwtContext) 가 호출되면
      // 현재 트리에서 가장 가까운 jwtContext./provider를 찾는다.
      // provider의 value 값을 반환
};

// react에서 children은 특정 컴포넌트 태그의 열고 닫는 태그 사이에 있는 내용을 가리킨다.
  // 해당 내용을 그대로 컴포넌트 내부로 전달할 때 사용된다.
    // AuthProvider 컴포넌트 안에 있는 컴포넌트들이 props.children 으로 전달된다.
    // -> children은 authprovider 태그 사이에 들어간 jsx 를 JWTContext.Provider로 감싸고 그 내부에서 렌더링되도록 만든다. 

export default JWTContext;
