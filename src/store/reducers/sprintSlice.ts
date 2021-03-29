import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.models';

interface WordsType {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

const initialState = {
  wordsArr: [] as Array<WordsType>,
  word: {} as WordsType,
  translation: '',
  score: 0,
  pointsToAdd: 10,
  isFinished: false,
  correctSeries: 0,
  correctAnswers: [] as Array<WordsType>,
  wrongAnswers: [] as Array<WordsType>,
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
      state.translation = state.wordsArr[0].wordTranslate
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
      if ((state.word.wordTranslate === state.translation) === action.payload) {
        state.score += state.pointsToAdd;
        state.correctSeries += 1;
        state.correctAnswers = [...state.correctAnswers, state.word]
      } else {
        state.correctSeries = 0;
        state.pointsToAdd = 10;
        state.wrongAnswers = [...state.wrongAnswers, state.word]
      }
    },
    gameOver: (state) => {
      state.isFinished = true;
    },
    makeAnswer: (state, { payload: word }) => {
      if (state.word.wordTranslate === word.wordTranslate) {
        state.correctAnswers = [...state.correctAnswers, state.word]
      } else {
        state.wrongAnswers = [...state.wrongAnswers, state.word]
      }
    },
  },
});

const { actions, reducer } = sprintSlice;

export const { nextWord, setTranslated, setScore, gameOver, makeAnswer, setWordsArr } = actions;

export const wordsArr = (state: RootState) => state.sprint.wordsArr;
export const word = (state: RootState) => state.sprint.word;
export const translation = (state: RootState) => state.sprint.translation;
export const score = (state: RootState) => state.sprint.score;
export const isFinished = (state: RootState) => state.sprint.isFinished;
export const correctSeries = (state: RootState) => state.sprint.correctSeries;
export const pointsToAdd = (state: RootState) => state.sprint.pointsToAdd;
export const wrongAnswers = (state: RootState) => state.sprint.wrongAnswers;
export const correctAnswers = (state: RootState) => state.sprint.correctAnswers;

export default reducer;
