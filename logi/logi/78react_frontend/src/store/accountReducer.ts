// action - state management
import { LOGIN, LOGOUT, REGISTER } from './actions';
import { InitialLoginContextProps } from 'types';

// ==============================|| ACCOUNT REDUCER ||============================== //

// 민성 코드 수정 : isLoggedIn 부분 => true 로 변경
const initialState: InitialLoginContextProps = {
  isLoggedIn: true,
  isInitialized: false,
  user: null
};

interface AccountReducerActionProps {
  type: string;
  payload?: InitialLoginContextProps;
}

// eslint-disable-next-line
const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
  console.log(initialState); 
  //  ㄴ 위의 isLoggedIn, isInitialized, user 부분의 값이 stat 에 담긴다.
  console.log("action : " + action.type);
  //  ㄴ login 이 찍힌다.

  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload!;
      return {
        ...state,
        user
      };
    }
    case LOGIN: {
      const { user } = action.payload!;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
        // user 안에 객체가 존재한다고 해도
          // 별도의 상태 필드로 명확하게 로그인 상태를 표현해 주는 것이 상태 관리 측면에서 더 안전하고 직관적이다.
          // 디버깅에도 유의하다.
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
