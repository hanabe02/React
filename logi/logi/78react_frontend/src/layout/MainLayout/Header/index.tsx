// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, useMediaQuery } from '@mui/material';

// project imports
import { LAYOUT_CONST } from 'constant';
import useConfig from 'hooks/useConfig';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import LocalizationSection from './LocalizationSection';
import MegaMenuSection from './MegaMenuSection';
import NotificationSection from './NotificationSection';

import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';

// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { layout } = useConfig();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection /> 
          {/* 
          box : material-ui 에서 제공하는 유연한 레이아웃 컨테이너 컴포넌트이다.
          logoSection : 화면 크기에 따라 표시 여부를 조정하는 목적 
          */}
        </Box>
        {(layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd)) && (
          // 조건부 렌더링 
          // layout 값에 따라 특정 ui 요소를 렌더링
          // 반응형 디자인 : 화면 크기와 레이아웃 타입에 따라 특정 ui 요소를 조건부로 렌더링하여 ux 최적화
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              overflow: 'hidden',
              transition: 'all .2s ease-in-out',
              background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
              color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
              }
            }}
            onClick={() => dispatch(openDrawer(!drawerOpen))}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="20px" />
          </Avatar>
        )}
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* mega-menu */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <MegaMenuSection />
      </Box>

      {/* live customization & localization */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <LocalizationSection />
        {/* 한/영/일/중 언어 변경 부분분 */}
      </Box>

      {/* notification & profile */}
      <NotificationSection />
      {/* 알람종 버튼 클릭시 나오는 코드드 */}
      <ProfileSection />
      {/* 프로필 버튼 클릭시 나오는 코드드 */}

      {/* mobile header */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileSection />
      </Box>
    </>
  );
};

export default Header;
