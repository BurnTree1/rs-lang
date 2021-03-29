import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.models';

export interface WordsType {
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
  next: {} as WordsType,
  isFinished: false,
  correctAnswers: [] as Array<WordsType>,
  wrongAnswers: [] as Array<WordsType>,
  isAnswered: false
};

const sprintSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setWord: (state) => {
      
    },
    setAudioWords: (state, {payload: words}) => {
      for (const key in words) {
        if (Object.prototype.hasOwnProperty.call(words, key)) {
        state.wordsArr = [...state.wordsArr, words[key]]
        }
      }
      state.word = {...state.wordsArr[0]}
      state.next = {...state.wordsArr[1]}
    },
    nextWord: (state, { payload: word }) => {
      const wordIndex = state.wordsArr.findIndex((w) => w.word === word.word);
      if (wordIndex >= state.wordsArr.length - 1) {
        state.isFinished = true;
        state.word = state.wordsArr[wordIndex];
      } else {
        state.word = state.wordsArr[wordIndex + 1];
        if(state.wordsArr[wordIndex + 2]) {
          state.next = state.wordsArr[wordIndex + 2];
        } else {
          state.next = state.wordsArr[state.wordsArr.length - 1]
        }
      }
    },
    setAnswered: (state, { payload: isAnswered }:PayloadAction<boolean>) => {
      state.isAnswered = isAnswered
    },
    makeAnswer: (state, { payload: word }) => {
      if (state.word.wordTranslate === word) {
        state.correctAnswers = [...state.correctAnswers, state.word]
      } else {
        state.wrongAnswers = [...state.wrongAnswers, state.word]
      }
    },
    gameOver: (state) => {
      state.isFinished = true;
    },
  },
});

const { actions, reducer } = sprintSlice;

export const { nextWord, gameOver, setWord, makeAnswer, setAnswered, setAudioWords } = actions;

export const wordsArr = (state: RootState) => state.audio.wordsArr;
export const word = (state: RootState) => state.audio.word;
export const next = (state: RootState) => state.audio.next;
export const translation = (state: RootState) => state.audio.translation;
export const score = (state: RootState) => state.audio.score;
export const isFinished = (state: RootState) => state.audio.isFinished;
export const correctSeries = (state: RootState) => state.audio.correctSeries;
export const pointsToAdd = (state: RootState) => state.audio.pointsToAdd;
export const isAnswered = (state: RootState) => state.audio.isAnswered;
export const correctAnswers = (state: RootState) => state.audio.correctAnswers;
export const wrongAnswers = (state: RootState) => state.audio.wrongAnswers;

export default reducer;
