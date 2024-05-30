import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = "150000.00";

const basicSalarySlice = createSlice({
  name: 'basicSalary',
  initialState,
  reducers: {
    updateBasicSalary: (_state, action: PayloadAction<string>) => action.payload,
    resetBasicSalary: () => initialState
  }
});

export const { updateBasicSalary,resetBasicSalary } = basicSalarySlice.actions;
export default basicSalarySlice.reducer;
