import React from 'react';
import Layout from "layout";
import MainCard from "ui-component/cards/MainCard";
import { Tabs, Tab, Box } from "@mui/material";
import PropTypes from "prop-types";
import ReleaseProcess from "./ReleaseProcess";
import ReleaseInfo from "./ReleaseInfo";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

// TabPanel 컴포넌트 정의
function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
};

// Tabs 접근성을 위한 함수
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

// 출고 관리 메인 컴포넌트
function Release() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard>
            <Tabs
                value={value}
                indicatorColor="secondary"
                textColor="secondary"
                onChange={handleChange}
                variant="scrollable"
                aria-label="simple tabs example"
                sx={{
                '& a': {
                    fontWeight: 'bold',
                    minHeight: 'auto',
                    minWidth: 10,
                    px: 1,
                    py: 1.5,
                    mr: 2.25,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                '& a > svg': {
                    marginBottom: '0px !important',
                    marginRight: 1.25
                },
                mb: 3
                }}
            >
                <Tab label="출고 처리" {...a11yProps(0)} />
                <Tab label="출고 현황" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <ReleaseProcess />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ReleaseInfo />
            </TabPanel>
        </MainCard>
        
    );
}

// 페이지 레이아웃 설정
Release.getLayout = function getLayout(Page) {
    return <Layout>{Page}</Layout>;
};

export default Release;


// import React from "react";
// import Layout from "layout";
// import { Tabs, Tab, Box } from "@mui/material";

// // 출고 관리 메인 컴포넌트
// function Release() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box>
//       <Tabs value={value} onChange={handleChange} aria-label="release tabs">
//         <Tab label="출고 처리" />
//         <Tab label="출고 현황" />
//       </Tabs>
//       <Box sx={{ p: 3 }}>
//         {value === 0 && <div>출고 처리 화면</div>}
//         {value === 1 && <div>출고 현황 화면</div>}
//       </Box>
//     </Box>
//   );
// }

// // 페이지 레이아웃 설정
// Release.getLayout = function getLayout(Page) {
//   return <Layout>{Page}</Layout>;
// };

// export default Release;
