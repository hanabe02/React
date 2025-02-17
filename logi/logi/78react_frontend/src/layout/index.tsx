// project import
import LAYOUT, { Props } from 'constant';
import MainLayout from './MainLayout';
import MinimalLayout from './MinimalLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
import GuestGuard from 'utils/route-guard/GuestGuard';
// ==============================|| LAYOUTS - STRUCTURE ||============================== //

export default function Layout({ variant = LAYOUT.main, children }: Props) {
  // variant : (minimal) 레이아웃 스타일을 결정하는 속성, 기본값 :layout.main
  // children : page(Loading 페이지 컴포넌트)

  
  // / (pages/index.tsx) variant : minimal
  // / Live Preview 버튼 클릭시 variant : main 으로 변경
  // / /pages/Login 부분 코드 실행시 variant : noauth 로 변경

  switch (variant) {
    // variant 의 값에 따라 다른 레이아웃을 렌더링한다. 
    case LAYOUT.minimal: 
    // 간소화된 레이아웃, 일반적으로 헤더나 사이드바 없이 콘텐츠만 렌더링
      // 로그인 페이지, 비밀번호 재설정 페이지 등 단순한 페이지에 적합
      return <MinimalLayout>{children}</MinimalLayout>;

    case LAYOUT.noauth:
      // 위와 동일 간소화된 레이아웃

      // 게스트 보호 로직 적용
        // 사용자가 로그인 상태라면 리다이렉트하여 로그인 페이지나 회원가입 페이지를 보호
      return (
        <GuestGuard>
          <MinimalLayout>{children}</MinimalLayout>
        </GuestGuard>
      );
      // 로그인/회원 가입 페이지에서 이미 로그인한 사용자가 접근하지 못하게 하려는 경우

    default:
      // 헤더, 사이드바, 푸터 등이 포함된 완전한 레이아웃
      // 인증 보호 로직을 적용
        // 사용자가 로그인 상태가 아니면 로그인 페이지로 리다이랙트
      return (
        <AuthGuard>
          {
            
          /* isLoggedIn이 false 일 경우 useEffect 에서 리다이렉트 시도. 동시에 <Loader />를 반환 MainLayout 미실행 사용자는 로딩 ui로 설정된 <Loader />만 보게 된다.
          react 에서 컴포넌트가 특정 조건에서 반환된 값이 있으면, 그 이후의 jsx나 하위 컴포넌트는 렌더링 되지 않는다. 
          
          */}
          <MainLayout>{children}</MainLayout>
        </AuthGuard>
      );
      // 인증이 필요한 페이지(대시보드, 프로필 등)
  }
}

// layout 컴포넌트 호출 시 variant 값에 따라 분기 처리 
  // minimal : <minimalLayout> 만 렌더링
  // noauth : <guestGuard>로 보호된 <MinimalLayout> 렌더링
  // main : <autoGuard> 로 보호된 <MainLayout> 렌더링
