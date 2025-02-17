import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Theme, useTheme } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Page from 'components/ui-component/Page';
import PropTypes from 'prop-types';
import Layout from 'layout';
import SearchStockListForm from './SearchStockListForm';
import StockLogListForm from './StockLogListForm';

import Swal from 'sweetalert2';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const OrderStockForm = () => {
  const theme: Theme = useTheme();
  const [value, setValue] = useState(0);
  const [authCheck, setAuthCheck] = useState<null | boolean>(null); 

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const rankOrder: { [key: string]: number } = {
    사원: 1,
    대리: 2,
    과장: 3,
    차장: 4,
    부장: 5,
    CTO: 6,
    CEO: 7,
  };

  useEffect(() => {
        const position = localStorage.getItem('positionName') as string; // 직급 정보 가져오기
        console.log("사용자 직급:", position);
    
        const minRequiredRank = 3; // 최소 접근 가능 직급 (과장 이상)
    
        if (position && rankOrder[position] >= minRequiredRank) {
          setAuthCheck(true);
        } else {
          setAuthCheck(false);
          Swal.fire({
            icon: 'error',
            text: `'과장' 직급 이상만 접근 가능합니다.`,
          });
        }
      }, []);

  return (
    <Page title="Client Information">
      {authCheck === null ? ( // authCheck가 null이면 로딩 화면 표시
      <MainCard style={{ textAlign: 'center', padding: '20px' }}>
        <p>권한 확인 중...</p>
      </MainCard>
      ) : authCheck ? (
      <MainCard>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="simple tabs example"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              minHeight: 'auto',
              minWidth: 10,
              px: 1,
              py: 1.5,
              mr: 2.25,
              color: theme.palette.grey[600],
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            },
            '& .Mui-selected': {
              color: theme.palette.secondary.main
            },
            '& .MuiTab-wrapper > svg': {
              marginBottom: '0px !important',
              marginRight: 1.25
            },
            mb: 3
          }}
        >
          <Tab label="창고 입고" {...a11yProps(0)} />
          <Tab label="재고 로그" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <SearchStockListForm />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <StockLogListForm /> 
        </TabPanel>

      </MainCard>
      ) : (
        <MainCard
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DoDisturbIcon style={{ color: 'red', marginRight: '8px' }} />
              접근 권한 없음
            </div>
          }
          style={{ textAlign: 'center', padding: '20px' }}
        >
          <p>권한이 부족하여 이 페이지에 접근할 수 없습니다.</p>
        </MainCard>
      )}
    </Page>
  );
}

OrderStockForm.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default OrderStockForm
