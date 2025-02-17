// 🌟new

import { createAction } from '@reduxjs/toolkit';
import * as types from './BasicInfoActionType';

/*******************************기본정보조회******************************* */
// createAction 이란
    // redux의 액션 생성기를 간편하게 생성하기 위한 함수이다.
    // 이 함수는 redux Toolkit 또는 redux의 유틸리티를 사용하여 특정 액션 타입과 관련된 액션 객체를 생성한다.

export const searchWorkplaceList = createAction(types.SEARCH_WORKPLACE_LIST);
// searchWorkplaceList 는 redux 액션 객체를 생성하는 함수 -> 이거 때문에 dispatch 에서 함수 사용이 가능해짐
    // ex) dispatch(searchWorkplaceList()) 를 호출하면 다음과 같은 액션 객체가 생성된다.
    // 이 액션은 Redux-Sage 에서 감지되어 비동기 작업을 실행한다.
export const searchWorkplaceListSuccess = createAction(types.SEARCH_WORKPLACE_LIST_SUCCESS);
export const searchWorkplaceListFailure = createAction(types.SEARCH_WORKPLACE_LIST_FAILURE);

export const addWorkplaceTO = createAction(types.ADD_WORKPLACE);
export const workplaceList = createAction(types.WORKPLACE_LIST);
export const delWorkplaceTO = createAction(types.DEL_WORKPLACE);

export const saveWorkplace = createAction(types.SAVE_WORKPLACE);
export const saveWorkplaceSuccess = createAction(types.SAVE_WORKPLACE_SUCCESS);
export const saveWorkplaceFailure = createAction(types.SAVE_WORKPLACE_FAILURE);
export const modWorkplaceTO = createAction(types.MOD_WORKPLACE);

/*******************************부서정보******************************* */
export const searchDeptInfo = createAction(types.SEARCH_DEPTINFO);
export const searchDeptSuccess = createAction(types.SEARCH_DEPTINFO_SUCCESS);
export const searchDeptFailure = createAction(types.SEARCH_DEPTINFO_FAILURE);
export const addDeptInfo = createAction(types.ADD_DEPTINFO);
export const savaDeptInfo = createAction(types.SAVE_DEPTINFO);
export const savaDeptSuccess = createAction(types.SAVE_DEPTINFO_SUCCESS);
export const savaDeptFailure = createAction(types.SAVE_DEPTINFO_FAILURE);

/*******************************거래처정보******************************* */
export const addClientinfoTO = createAction(types.ADD_CLIENTINFO);
export const searchClientInfo = createAction(types.SEARCH_CLIENTINFO);
export const searchClientSuccess = createAction(types.SEARCH_CLIENTINFO_SUCCESS);
export const searchClientFailure = createAction(types.SEARCH_CLIENTINFO_FAILURE);

export const addFinanceinfoTO = createAction(types.ADD_FINANINFO);
export const searchFinanInfo = createAction(types.SEARCH_FINANINFO);
export const searchFinanInfoSuccess = createAction(types.SEARCH_FINANINFO_SUCCESS);
export const searchFinanInfoFailure = createAction(types.SEARCH_FINANINFO_FAILURE);

export const savaClientInfo = createAction(types.SAVE_CLIENTINFO);
export const saveClientSuccess = createAction(types.SAVE_CLIENT_SUCCESS);
export const saveClientFailure = createAction(types.SAVE_CLIENT_FAILURE);

export const saveFinanInfo = createAction(types.SAVE_FINANINFO);
export const saveFinanInfoSuccess = createAction(types.SAVE_FINANINFO_SUCCESS);
export const saveFinanInfoFailure = createAction(types.SAVE_FINANINFO_FAILURE);
