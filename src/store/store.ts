import { configureStore } from '@reduxjs/toolkit';
import sprint from './reducers/sprintSlice';
import audio from './reducers/audioSlice';
import book from './reducers/book'

export const store = configureStore({
  reducer: {
    sprint,
    audio,
    book
  },
});
