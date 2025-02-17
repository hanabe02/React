import { memo, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, List, Typography, useMediaQuery } from '@mui/material';

// project imports
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import useConfig from 'hooks/useConfig';

import menuItem from 'menu-items';
import { Menu } from 'menu-items/widget';
import { useSelector } from 'store';
import { LAYOUT_CONST } from 'constant';
import { HORIZONTAL_MAX_ITEM } from 'config';

// types
import { NavItemType } from 'types';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const theme = useTheme();
  const { layout } = useConfig();
  const { drawerOpen } = useSelector((state) => state.menu);


  let getMenu = Menu();
  const handlerMenuItem = () => {
    const isFound = menuItem.items.some((element) => {
      if (element.id === 'widget') {
        return true;
      }
      return false;
    });

    if (getMenu?.id !== undefined && !isFound) {
      menuItem.items.splice(1, 0, getMenu);
    }
  };


  useEffect(() => {
    handlerMenuItem();
    // eslint-disable-next-line
  }, []);

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  // last menu-item to show in horizontal menu bar
  const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null;

  let lastItemIndex = menuItem.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && lastItem < menuItem.items.length) {
    lastItemId = menuItem.items[lastItem - 1].id!;
    lastItemIndex = lastItem - 1;
    remItems = menuItem.items.slice(lastItem - 1, menuItem.items.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon,
      ...(item.url && {
        url: item.url
      })
    }));
  }

  const navItems = menuItem.items.slice(0, lastItemIndex + 1).map((item) => {
    /* 
    console.log(item.type); // group 로 찍힘
    console.log(item.id); // logo(물류 업무), widget(widget)
    console.log(item.url); // undefined
    console.log(lastItemId); // undefined
    */
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          // && 두 가지 조건 모두 만족해야 한다. 때문에 false
          return (
            <List key={item.id}>
              <NavItem item={item} level={1} isParents />
              {layout !== LAYOUT_CONST.HORIZONTAL_LAYOUT && <Divider sx={{ py: 0.5 }} />}
            </List>
          );
        }
        return <NavGroup key={item.id} item={item} lastItem={lastItem!} remItems={remItems} lastItemId={lastItemId} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
    <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box>
  ) : (
    <>{navItems}</> // item.url && utem.id 조건 false -> NaveGroup 컴포넌트 실행 
  );
};
  /*
    조건 ? (참일 때 코드) : (거짓일 때 코드)
      layout 이 verical_layout 일 경우 : true
      layout 이 horizontal_layout, 화면 크기가 matchDownMd (화면 크기 기준, 작은 화면) 일 경우 true
      나머지 (...) false = <>{navItems}</>
  */



export default memo(MenuList);
