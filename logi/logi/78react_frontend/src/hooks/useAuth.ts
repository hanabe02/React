import { useContext } from 'react';

// auth provider
import AuthContext from 'contexts/JWTContext';
// import AuthContext from 'contexts/FirebaseContext';
// import AuthContext from 'contexts/Auth0Context';
// import AuthContext from 'contexts/AWSCognitoContext';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
  // useAuth 
    // hook 함수로 : authcontext.provider 에서 제공하는 데이터를 읽어와서 반환하는 것이다.
    // 컴포넌트에서 쉽게 인증 관련 데이터(로그인 상태, 로그인/로그아웃 함수 등)을 사용할 수 있도록 만든다.
  const context = useContext(AuthContext);
  // UseContext 훅 함수를 사용하여 : 부모가 제공한 데이터를 자식 컴포넌트에 가져오고 수정해서 화면에 반영하는 과정

  // authcontext 가 나오는 이유는 그저 import 를 통해 참조 했기 때문

  if (!context) throw new Error('context must be use inside provider');

  return context;
};
// useAuth 함수가 실행되는 과정
  // useContext(AuthContext) 호출
    // useContext는 react 의 내장 hook으로, context에서 값을 가져오는 역할을 한다.
    // 여기서 AutoContext는 react context 객체다.
      // const AuthContext = createContext(null);
    // 하지만 AuthContext 자체는 데이터가 없다. 데이터를 제공하려면 AuthContext.Provider를 사용해야 한다.

    // AuthContext.Provider 의 역할은
      // context에 어떤 데이터를 제공할지 정의한다.
      // 여기서 value 속성에 정의 된 데이터(login, logout, isAuthenticated)가 context 를 통해 전달된다.




export default useAuth;
