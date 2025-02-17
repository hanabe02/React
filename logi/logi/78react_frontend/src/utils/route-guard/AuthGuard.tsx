import { useRouter } from 'next/router';
// project imports
import useAuth from 'hooks/useAuth';
import { GuardProps } from 'types';
import { useEffect } from 'react';
import Loader from 'components/ui-component/Loader';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {

  const { isLoggedIn } = useAuth();
  // 사용자 커스텀 훅을 사용해 value 안의 값을 확인 isLoggedIn 값을 확인
  // 로그인 여부를 확인한다. 기본값은 : false(로그아웃). true(로그인)

  // 민성 - 코드추가 1줄
  // const isLoggedIn = true;

  const router = useRouter();
  // next.js 에서 제공하는 훅, 라우팅을 제어하거나 현재 경로에 대한 정보 가져올 떄 사용
  useEffect(() => {
    if (!isLoggedIn) { // false 일 경우 /login 페이지 리다이렉트
      router.push('/login');
      // router 객체의 여러 메서드 중 하나 push 메서드
        // http://localhost:3000/login 변경
    }
    // eslint-disable-next-line
  }, [isLoggedIn]); // isLoggedIn 값이 변경될 때마다 useEffect 실행


  if (!isLoggedIn) return <Loader />;
  // false 일 경우 if 문 실행 <Loader /> 컴포넌트를 반환하여 로딩 ui를 보여준다. 

  return children;
};

export default AuthGuard;
