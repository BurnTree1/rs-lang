import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
