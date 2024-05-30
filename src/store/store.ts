import { configureStore } from '@reduxjs/toolkit';
import allowancesReducer from '../features/allowancesSlice';
import deductionsReducer from '../features/deductionsSlice';
import basicSalaryReducer from '../features/basicSalarySlice';

const store = configureStore({
  reducer: {
    allowances: allowancesReducer,
    deductions: deductionsReducer,
    basicSalary: basicSalaryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
