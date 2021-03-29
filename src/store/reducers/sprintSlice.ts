import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.models';

interface WordsType {
  en: string;
  ru: string;
}

const initialState = {
  wordsArr: [] as Array<WordsType>,
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
    setWordsArr: (state, {payload}) => {
      for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
        state.wordsArr = [...state.wordsArr, payload[key]]
        }
      }
      state.word = {...state.wordsArr[0]}
      state.translation = {...state.wordsArr[0]}
    },
    nextWord: (state, action) => {
      const wordIndex = state.wordsArr.findIndex((w) => w.en === action.payload);
      if (wordIndex >= state.wordsArr.length - 1) {
        state.isFinished = true;
        state.word = state.wordsArr[wordIndex];
      } else {
        state.word = state.wordsArr[wordIndex + 1];
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

export const { nextWord, setTranslated, setScore, gameOver, setWordsArr } = actions;

export const words = (state: RootState) => state.sprint.words;
export const word = (state: RootState) => state.sprint.word;
export const translation = (state: RootState) => state.sprint.translation;
export const score = (state: RootState) => state.sprint.score;
export const isFinished = (state: RootState) => state.sprint.isFinished;
export const correctSeries = (state: RootState) => state.sprint.correctSeries;
export const pointsToAdd = (state: RootState) => state.sprint.pointsToAdd;

export default reducer;
