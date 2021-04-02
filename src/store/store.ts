import { configureStore } from '@reduxjs/toolkit';
import sprint from './reducers/sprintSlice';
import audio from './reducers/audioSlice';
import book from './reducers/book';
import memoryGame from './reducers/memoryGameSlice';

export const store = configureStore({
  reducer: {
    sprint,
    audio,
    book,
    memoryGame,
  },
});
