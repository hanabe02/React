import * as types from '../action/EstimateActionType';
import { EstimateTO } from 'types/logi/estimate/types';

type Action = {
  type: string;
  mode?: string;
  payload?: any;
  error?: any;
};

type State = {
  estimateList: EstimateTO[];
  errorMsg?: any;
  error?: any;
};

const initialState = {
  estimateList: []
};

function estimateReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case types.SEARCH_ESTIMATE: // 새로운 검색을 시작할 때 사용, 기존의 estimateList 를 초기화 한다.
      return {
        ...state,
        estimateList: []
      };
    case types.SEARCH_ESTIMATE_SUCCESS: // 이 액션이 디스패치 되면, action.payload.gridRowJson 값이 estimateList 에 저장된다.
                                        // action.payload.gridRowJson 은 서버에서 받은 데이터라고 볼 수 있다.
      return {
        ...state,
        estimateList: action.payload.gridRowJson
      };

    case types.SEARCH_ESTIMATE_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      };


    case types.REGISTER_ESTIMATE:
      return {
        ...state
      };
    case types.REGISTER_ESTIMATE_SUCCESS:
      return {
        ...state,
        errorMsg: action.payload
      };

    case types.REGISTER_ESTIMATE_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      };

    default:
      return state;
  }
}

export default estimateReducer;


// //함수형 리듀서
// import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// export interface Iestimate {
//   estimateData: [];
// }

// export interface IestimateState extends Iestimate {
//   estimateData: [];
//   estimateLoading: boolean;
//   estimateSuccess: boolean;
//   estimateError: any;
// }

// const initialState: IestimateState = {
//   estimateData: [],
//   estimateLoading: false,
//   estimateSuccess: false,
//   estimateError: null
// };

// const estimateSlice = createSlice({
//   name: 'estimate',
//   initialState,
//   reducers: {
//     requestEstimate(state: IestimateState) {
//       state.estimateLoading = true;
//     },
//     requestEstimateSuccess(state: IestimateState, action: PayloadAction<Iestimate>) {
//       state.estimateLoading = false;
//       state.estimateData = action.payload.estimateData;
//       state.estimateSuccess = true;
//     },
//     requestEstimateError(state: IestimateState) {
//       state.estimateLoading = false;
//       state.estimateError = '에러남';
//     }
//   }
// });

// export default estimateSlice.reducer;
// export const { requestEstimate, requestEstimateSuccess, requestEstimateError } = estimateSlice.actions;


