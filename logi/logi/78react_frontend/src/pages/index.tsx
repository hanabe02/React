import { ReactElement } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';

// project imports
import Layout from 'layout';
import Customization from 'layout/Customization';
import Page from 'components/ui-component/Page';
import AppBar from 'ui-component/extended/AppBar';

import HeaderSection from 'components/landingpage/HeaderSection';
import CardSection from 'components/landingpage/CardSection';
import CustomizeSection from 'components/landingpage/CustomizeSection';
import FeatureSection from 'components/landingpage/FeatureSection';
import PreBuildDashBoard from 'components/landingpage/PreBuildDashBoard';
import PeopleSection from 'components/landingpage/PeopleSection';
import StartupProjectSection from 'components/landingpage/StartupProjectSection';
// import IncludeSection from 'components/landingpage/IncludeSection';
// import RtlInfoSection from 'components/landingpage/RtlInfoSection';
import FrameworkSection from 'components/landingpage/FrameworkSection';
import FooterSection from 'components/landingpage/FooterSection';

const HeaderWrapper = styled('div')(({ theme }) => ({
  paddingTop: 30,
  overflowX: 'hidden',
  overflowY: 'clip',
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.background.default
      : `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
  [theme.breakpoints.down('md')]: {}
}));
// 컴포넌트에 스타일을 적용하는 역할 -> 해당 컴포넌트의 외형과 레이아웃을 꾸며준다.

const SectionWrapper = styled('div')({
  paddingTop: 100,
  paddingBottom: 100
});

// =============================|| LANDING MAIN ||============================= //
// next.js 프로젝트 첫 실행 
// next.js 서버가 요청을 수신
// pages/index.js 를 실행하여 html 을 생성하고 브라우저에 전달
// react 가 브라우저에서 하이드레이션(hydration)을 수행하여 동적인 웹으로 변환

const Landing = () => {
  console.log("Loading 컴포넌트 실행");
  const theme = useTheme();

  return (
    <Page title="Welcome"> {/* localhost3000/ 처음 실행 되는 부분 */}
      {/* 1. header and hero section */}
      <HeaderWrapper id="home">
        <AppBar /> {/* 각종 버튼이 들어 있다. Home, Dashboard, Documentation.. */}
        <HeaderSection /> {/* Live Preview 버튼 -> login, dashboard/defaulf 이동 */}
      </HeaderWrapper>

      {/* 2. card section */}
      <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
        <CardSection />
      </SectionWrapper>

      {/* 4. Developer Experience section */}
      <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.100' }}>
        <CustomizeSection />
      </SectionWrapper>

      {/* 3. about section */}
      <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
        <FeatureSection />
      </SectionWrapper>

      <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.100' }}>
        <PreBuildDashBoard />
      </SectionWrapper>

      {/* 5. people section */}
      <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
        <PeopleSection />
      </SectionWrapper>

      {/* 6. startup section */}
      <SectionWrapper sx={{ py: 0 }}>
        <StartupProjectSection />
      </SectionWrapper>

      {/* multi-language section */}
      {/* <SectionWrapper sx={{ py: 0 }}>
        <RtlInfoSection />
      </SectionWrapper> */}

      {/* framework section */}
      <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
        <FrameworkSection />
      </SectionWrapper>
      {/* footer section */}
      <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'dark.900', pb: 0 }}>
        <FooterSection />
      </SectionWrapper>
      <Customization />
    </Page>
  );
};

Landing.getLayout = function getLayout(page: ReactElement) {
  // console.log("디버깅 포인트");
  return <Layout variant="minimal">{page}</Layout>;
};
// Landing 컴포넌트에  getLayout 이라는 속성을 추가한다.
// next.js에서 getLayout 속성은 특정 페이지에서 커스텀 레이아웃을 지정하기 위해 사용된다.
// getLayout 은 함수로 page를 받는다.
  // page : Landing 페이지 컴포넌트의 react 엘리먼트를 나타낸다.
  // 즉 Landing 컴포넌트가 page로 전달된다.

  // return 을 통해 page를 Layout 컴포넌트로 감싸서 반환한다.

  // 결과 Landing 페이지가 Layout 컴포넌트 내부에 감싸진 상태로 렌더링 된다.

export default Landing;
