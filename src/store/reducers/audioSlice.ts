import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.models';

export interface WordsType {
  en: string;
  ru: string;
  audio: string
  image: string
}

const initialState = {
  words: [
    { en: 'boat', ru: 'лодка', audio: 'https://react-learnwords-example.herokuapp.com/files/01_0005.mp3', image: 'https://react-learnwords-example.herokuapp.com/files/01_0005.jpg' },
    { en: 'agree', ru: 'согласна', audio: 'https://react-learnwords-example.herokuapp.com/files/01_0001.mp3', image: 'https://react-learnwords-example.herokuapp.com/files/01_0001.jpg' },
    { en: 'arrive', ru: 'прибыть', audio: 'https://react-learnwords-example.herokuapp.com/files/01_0003.mp3', image: 'https://react-learnwords-example.herokuapp.com/files/01_0003.jpg' },
    { en: 'alcohol', ru: 'алкоголь', audio: 'https://react-learnwords-example.herokuapp.com/files/01_0002.mp3', image: 'https://react-learnwords-example.herokuapp.com/files/01_0002.jpg' },
    { en: 'August', ru: 'август', audio: 'https://react-learnwords-example.herokuapp.com/files/01_0004.mp3', image: 'https://react-learnwords-example.herokuapp.com/files/01_0004.jpg' },
    { en: 'breakfast', ru: 'завтрак', audio: 'https://react-learnwords-example.herokuapp.com/files/01_0006.mp3', image: 'https://react-learnwords-example.herokuapp.com/files/01_0006.jpg' },
  ] as Array<WordsType>,
  word: { en: 'boat', ru: 'лодка', audio: 'https://react-learnwords-example.herokuapp.com/files/01_0005.mp3', image: 'https://react-learnwords-example.herokuapp.com/files/01_0005.jpg' },
  next: { en: 'agree', ru: 'согласна', audio: 'https://react-learnwords-example.herokuapp.com/files/01_0001.mp3', image: 'https://react-learnwords-example.herokuapp.com/files/01_0001.jpg' },
  isFinished: false,
  correctAnswers: [] as Array<WordsType>,
  wrongAnswers: [] as Array<WordsType>,
  isCorrectAnswer: null as null | boolean,
  isAnswered: false
};

const sprintSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setWord: (state) => {
      state.word = { en: 'boat', ru: 'лодка', audio: 'https://react-learnwords-example.herokuapp.com/files/01_0005.mp3', image: 'https://react-learnwords-example.herokuapp.com/files/01_0005.jpg' }
    },
    nextWord: (state, { payload: word }) => {
      const wordIndex = state.words.findIndex((w) => w.en === word.en);
      if (wordIndex >= state.words.length - 1) {
        state.isFinished = true;
        state.word = state.words[wordIndex];
      } else {
        state.word = state.words[wordIndex + 1];
        if(state.words[wordIndex + 2]) {
          state.next = state.words[wordIndex + 2];
        } else {
          state.next = state.words[state.words.length - 1]
        }
      }
    },
    setAnswered: (state, { payload: isAnswered }:PayloadAction<boolean>) => {
      state.isAnswered = isAnswered
    },
    makeAnswer: (state, { payload: word }) => {
      if (state.word.ru === word) {
        state.correctAnswers = [...state.correctAnswers, state.word]
        state.isCorrectAnswer = true
      } else {
        state.wrongAnswers = [...state.wrongAnswers, state.word]
        state.isCorrectAnswer = false
      }
    },
    gameOver: (state) => {
      state.isFinished = true;
    },
  },
});

const { actions, reducer } = sprintSlice;

export const { nextWord, gameOver, setWord, makeAnswer, setAnswered } = actions;

export const words = (state: RootState) => state.audio.words;
export const word = (state: RootState) => state.audio.word;
export const next = (state: RootState) => state.audio.next;
export const translation = (state: RootState) => state.audio.translation;
export const score = (state: RootState) => state.audio.score;
export const isFinished = (state: RootState) => state.audio.isFinished;
export const correctSeries = (state: RootState) => state.audio.correctSeries;
export const pointsToAdd = (state: RootState) => state.audio.pointsToAdd;
export const isAnswered = (state: RootState) => state.audio.isAnswered;

export default reducer;
