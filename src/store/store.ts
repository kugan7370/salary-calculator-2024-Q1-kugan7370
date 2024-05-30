import { combineReducers, configureStore } from '@reduxjs/toolkit';
import allowancesReducer from '../features/allowancesSlice';
import deductionsReducer from '../features/deductionsSlice';
import basicSalaryReducer from '../features/basicSalarySlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'




const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({


  allowances: allowancesReducer,
  deductions: deductionsReducer,
  basicSalary: basicSalaryReducer

})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
