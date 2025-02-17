import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gatherList: [],
    gatherLoading: false,
    gatherSuccess: false,
    gatherError: null,
    registerGatherLoading: false,
    registerGatherSuccess: false,
    registerGatherError: null,
    gatheringList: [],
    gatheringLoading: false,
    gatheringSuccess: false,
    gatheringError: null,
  };

  const gatherSlice = createSlice({
    name: 'gather',
    initialState,
    reducers: {
      getMrpGatherList(state) {
        state.gatherLoading = true;
      },

      getMrpGatherListSuccess(state, action) {
        state.gatherList = action.payload.gatherList;
        state.gatherLoading = false;
        state.gatherSuccess = true;
      },

      getMrpGatherListError(state) {
        state.gatherLoading = false;
        state.gatherError = '에러남';
      },

      registerMrpGatherList(state) {
        state.registerGatherLoading = true;
      },

      registerMrpGatherListSuccess(state) {
        state.registerGatherSuccess = false;
      },

      registerMrpGatherListError(state) {
        state.registerGatherError = false;
        state.registerGatherError = '에러남';
      },

      getMrpGatheringList(state) {
        state.gatheringLoading = true;
        // api가 누락된 이유
        // 현재 코드에서 redux toolkit 의 비동기 작업을 처리하기 위한 미들웨어(redux-saga, redux-thunk, createAsybcThunk 를 사용하지 않았다.)
        // 따라서 dispatch 가 단순히 상태를 업데이트 하는 데 그치고, 서버와 통신하는 로직이 포함되지 않은 상태이다.
      },

      getMrpGatheringListSuccess(state, action) {
        state.gatheringList = action.payload.data.gridRowJson
        state.gatheringLoading = false;
        state.gatheringSuccess = true;
      },

      getMrpGatheringListError(state) {
        state.gatheringLoading = false;
        state.gatheringError = '에러남';
      }
    }
  });
  
  export default gatherSlice.reducer;

  export const { getMrpGatherList, getMrpGatherListSuccess, getMrpGatherListError,
    registerMrpGatherList, registerMrpGatherListSuccess, registerMrpGatherListError,
    getMrpGatheringList, getMrpGatheringListSuccess, getMrpGatheringListError } = gatherSlice.actions;