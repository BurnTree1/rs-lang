import { configureStore } from '@reduxjs/toolkit';
import sprint from './reducers/sprintSlice';
import book from './reducers/book'

export const store = configureStore({
  reducer: {
    sprint, book
  },
});
