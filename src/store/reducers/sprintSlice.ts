import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.models';
import words from '../../Сomponents/Savannah/mockData'

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
  wordsArr: words as Array<WordsType>,
  word: words[0] as WordsType,
  translation: words[0].wordTranslate as string,
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
    nextWord: (state, { payload: word }) => {
      const wordIndex = state.wordsArr.findIndex((w) => w.word === word);
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

export const { nextWord, setTranslated, setScore, gameOver, makeAnswer } = actions;

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
