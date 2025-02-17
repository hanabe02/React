// types
import { MenuProps } from 'types/menu';
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import axios from 'utils/axios';

// initial state : 초기 상태
const initialState: MenuProps = {
  selectedItem: ['dashboard'],
  // 현재 선택된 메뉴 아이템
  selectedID: null, // 현재 선택된 메뉴 id
  drawerOpen: false, // 사이드바 열림 여부
  error: null, // 에러 사애
  menu: {} // api 호출로 가져온 메뉴 데이터 저장
};

// ==============================|| SLICE - MENU ||============================== //
/*
  redux를 사용해 메뉴 상태 관리를 위한 슬라이스(menu)를 정의
  사이드바 상태, 메뉴 선택 상태, 
  그리고 api 에서 메뉴 데이터를 가져오는 동작을 관리하기 위한 설정이다.

*/


// redux 슬라이스 정의 
const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.selectedItem = action.payload; // 선택된 메뉴 아이템 업데이트
    },

    activeID(state, action) {
      state.selectedID = action.payload; // 선택된 부모 메뉴 id 업데이트 
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload; // 사이드바 열림/닫힘 상태 업데이트
    },

    // has error
    hasError(state, action) {
      state.error = action.payload;
    },

    // get dashboard menu
    getMenuSuccess(state, action) {
      state.menu = action.payload; // api 로 부터 받은 메뉴 데이터 저장
    }
  }
});

export default menu.reducer;

export const { activeItem, openDrawer, activeID } = menu.actions;
// redux와 redux toolkit을 활용해 사이드바 메뉴의 상태를 관리하기 위해 작성
// 메뉴 클릭 시 호출되는 itemHandler는 슬라이스에서 정의된 액션
// activeItem, activeId, openDrawer 를 사용해 상태를 업데이트 한다.

// api를 통해 메뉴 데이터를 가져와 저장할 수 있도록 getMenu() 함수도 포함되어 있다.

export function getMenu() {
  return async () => {
    try {
      const response = await axios.get('/api/menu/widget');
      // https://mock-data-api-nextjs.vercel.app/api/menu/widget 
      dispatch(menu.actions.getMenuSuccess(response.data.widget));
    } catch (error) {
      dispatch(menu.actions.hasError(error));
    }
  };
}
