import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterReducer';
import sprint from '../Components/Sprint/sprintSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sprint,
  },
});
