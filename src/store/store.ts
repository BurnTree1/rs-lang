import { configureStore } from '@reduxjs/toolkit';
import sprint from './reducers/sprintSlice';

export const store = configureStore({
  reducer: {
    sprint,
  },
});
