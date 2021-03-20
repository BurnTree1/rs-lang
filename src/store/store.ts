import { configureStore } from '@reduxjs/toolkit';
import savannahReducer from './slices/Savannah'

export const store = configureStore({
  reducer: {
    counter: savannahReducer,
  },
});
