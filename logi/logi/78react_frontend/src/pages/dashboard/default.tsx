import { useEffect, useState, ReactElement } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import EarningCard from 'components/dashboard/Default/EarningCard';
import PopularCard from 'components/dashboard/Default/PopularCard';
import TotalOrderLineChartCard from 'components/dashboard/Default/TotalOrderLineChartCard';
import TotalIncomeDarkCard from 'components/dashboard/Default/TotalIncomeDarkCard';
import TotalIncomeLightCard from 'components/dashboard/Default/TotalIncomeLightCard';
import TotalGrowthBarChart from 'components/dashboard/Default/TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  // Dashboard 컴포넌트를 정의
    // 대시보드 페이지에 필요한 데이터를 초기화하거나 로딩 상태를 관리 
    // grid와 다양한 카드 컴포넌트를 렌더링하여 ui를 구성

  return (
    <Page title="Default Dashboard">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EarningCard isLoading={isLoading} />
              {/* $500 total income */}
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalOrderLineChartCard isLoading={isLoading} />
              {/* 961 Total Order */}
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeDarkCard isLoading={isLoading} />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeLightCard isLoading={isLoading} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
// getLayout : next.js 에서 페이지 단위로 레이아웃을 지정하는 데 사용
// Layout : 공통적으로 사용되는 레이아웃 컴포넌트, 예를들어 헤더, 사이드바, 푸터 등이 포함된 틀
// page: 현재 렌더링 중인 페이지 컴포넌트(여기서는 dashboard)

// 동작 원리 pages/dashboard/index.tsx 파일은 /dashboard 경로로 매핑
// getLayout 사용
  // next.js에서 페이지 컴포넌트가 렌더링되기 전에 실행
  // 해당 페이지에 특정 레이아웃을 감ㅆ나느 데 사용된다.

// Dashboard.getLayout**의 역할 -> Dashboard 페이지를 렌더링할 때 <Layout> 컴포넌트로 감싼다. 때문에 layout 컴포넌트가 먼저 실행이 된다. 

export default Dashboard;
