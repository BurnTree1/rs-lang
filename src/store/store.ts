import { configureStore } from '@reduxjs/toolkit';
import sprint from './reducers/sprintSlice';
import audio from './reducers/audioSlice';

export const store = configureStore({
  reducer: {
    sprint,
    audio,
  },
});
