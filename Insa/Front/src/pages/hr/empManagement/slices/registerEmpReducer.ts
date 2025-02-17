import { createSlice } from '@reduxjs/toolkit';

type registerStatus = { errorCode: string; errorMsg: string | null };

let initialState: registerStatus = { errorCode: '', errorMsg: '' };

const registerEmpSlice = createSlice({
  name: 'registerEmp',
  initialState: initialState,
  reducers: {
    REGISTER_EMP_REQUSTED(state, action) {
      console.log('가나다라');
    },
    REGISTER_EMP_STATUS(state, action) {
      const { errorCode, errorMsg } = action.payload;
      console.log('action.payload from registerEmp', errorCode, errorMsg);
      state.errorCode = errorCode;
      state.errorMsg = errorMsg;
    },
    REGISTER_EMP_PiC_REQUSTED(state, action) {
      console.log('마바사아');
    }
  }
});

export const registerEmpAction = registerEmpSlice.actions;

export default registerEmpSlice;
