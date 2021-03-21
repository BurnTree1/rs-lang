import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.models';

interface WordsType {
  en: string;
  ru: string;
}

const initialState = {
  words: [
    { en: 'hello', ru: 'привет' },
    { en: 'world', ru: 'мир' },
    { en: 'table', ru: 'стол' },
    { en: 'alcohol', ru: 'алкоголь' },
    { en: 'catch', ru: 'поймать' },
    { en: 'duck', ru: 'утка' },
  ] as Array<WordsType>,
  word: { en: 'hello', ru: 'привет' },
  translation: { en: 'hello', ru: 'привет' },
  score: 0,
  pointsToAdd: 10,
  isFinished: false,
  correctSeries: 0,
};

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    nextWord: (state, action) => {
      const wordIndex = state.words.findIndex((w) => w.en === action.payload);
      if (wordIndex >= state.words.length - 1) {
        state.isFinished = true;
        state.word = state.words[wordIndex];
      } else {
        state.word = state.words[wordIndex + 1];
      }
    },
    setTranslated: (state, { payload }) => {
      state.translation = payload;
    },
    setScore: (state, action) => {
      if (state.correctSeries >= 12) {
        state.pointsToAdd = 80
      } else {
        const power = Math.floor(state.correctSeries / 3)
        state.pointsToAdd = 10 * Math.pow(2, power)
      }
      // if (state.correctSeries <= 2) {
      //   state.pointsToAdd = 10;
      // } else if (state.correctSeries >= 3 && state.correctSeries <= 5) {
      //   state.pointsToAdd = 20;
      // } else if (state.correctSeries >= 6 && state.correctSeries <= 8) {
      //   state.pointsToAdd = 40;
      // } else if (state.correctSeries >= 9) {
      //   state.pointsToAdd = 80;
      // }
      if ((state.word.en === state.translation.en) === action.payload) {
        state.score += state.pointsToAdd;
        state.correctSeries += 1;
      } else {
        state.correctSeries = 0;
        state.pointsToAdd = 10;
      }
    },
    gameOver: (state) => {
      state.isFinished = true;
    },
  },
});

const { actions, reducer } = sprintSlice;

export const { nextWord, setTranslated, setScore, gameOver } = actions;

export const words = (state: RootState) => state.sprint.words;
export const word = (state: RootState) => state.sprint.word;
export const translation = (state: RootState) => state.sprint.translation;
export const score = (state: RootState) => state.sprint.score;
export const isFinished = (state: RootState) => state.sprint.isFinished;
export const correctSeries = (state: RootState) => state.sprint.correctSeries;
export const pointsToAdd = (state: RootState) => state.sprint.pointsToAdd;

export default reducer;
