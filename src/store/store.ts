import { configureStore } from '@reduxjs/toolkit';
import sprint from './reducers/sprintSlice';
import audio from './reducers/audioSlice';
import auth from './reducers/authorizationSlice'
import book from './reducers/book';
import memoryGame from './reducers/memoryGameSlice';
import settings from './reducers/settings'

export const store = configureStore({
  reducer: {
    sprint,
    audio,
    book,
    memoryGame,
    settings,
    auth
  },
});
