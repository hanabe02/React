import { registerEmpAction } from '../slices/registerEmpReducer';
import { takeEvery, all, call } from 'redux-saga/effects';
import * as api from '../api/api';
import { typeAction } from '../types/empManagementTypes';
type empEvalRequest = { empList: []; message: '' };

// generator 함수는 yield 안하면은 해당 라인의 코드 실행 안함
// console.log()는 예외인거 같다.

export function* registerEmpActionSaga(action: typeAction) {
  console.log('empEvalResultActionSaga called!!! ', action.payload);
  console.log('empEvalResultActionSaga formData!!! ', action.payload.formData);

  const data: empEvalRequest = yield call(api.registerEmp, action);
  console.log('data from empEvalResultActionSaga:', data);

  yield call(api.uploadFile, action);
}
export function* registerEmpPicActionSaga(action: typeAction) {
  yield console.log('registerEmpPicActionSaga called!!! ', action.payload);
  yield call(api.uploadFile, action.payload);
}

// action과 api 요청을 보내주는 함수를 호출하는 saga를 연결해주는 saga
export function* onRegisterEmpSaga() {
  yield takeEvery(registerEmpAction.REGISTER_EMP_REQUSTED, registerEmpActionSaga);
  yield takeEvery(registerEmpAction.REGISTER_EMP_PiC_REQUSTED, registerEmpPicActionSaga);
}

export function* registerEmpSaga() {
  yield all([call(onRegisterEmpSaga)]);
}
