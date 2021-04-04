import { createSlice } from '@reduxjs/toolkit';
import { fetchWords } from '../../api/words';
import words from '../../Сomponents/Savannah/mockData';
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
  wordsArr: words as Array<WordsType>,
  word: {} as WordsType,
  translation: '',
  score: 0,
  pointsToAdd: 10,
  isFinished: false,
  correctSeries: 0,
  correctAnswers: [] as Array<WordsType>,
  wrongAnswers: [] as Array<WordsType>,
  hasDifficulty: true,
  difficulty: 0
};

export const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    setSprintWords: (state, { payload: fetchedWords }) => {
      state.wordsArr = []
      for (const key in fetchedWords) {
        if (Object.prototype.hasOwnProperty.call(fetchedWords, key)) {
        state.wordsArr = [...state.wordsArr, fetchedWords[key]]
        }
      }
      state.word = { ...state.wordsArr[0] }
      state.translation = state.wordsArr[0].wordTranslate
      state.hasDifficulty = false
    },
    nextWord: (state, action) => {
      const wordIndex = state.wordsArr.findIndex((w) => w.word === action.payload);
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
    gameOver: (state, { payload: isFinished }) => {
      state.isFinished = isFinished;
    },
    makeAnswer: (state, { payload: word }) => {
      if (state.word.wordTranslate === word.wordTranslate) {
        state.correctAnswers = [...state.correctAnswers, state.word]
      } else {
        state.wrongAnswers = [...state.wrongAnswers, state.word]
      }
    },
    setSprintDifficult: (state, { payload: difficulty }) => {
      state.difficulty = difficulty / 100
    },
    setHasDifficulty: (state) => {
      state.hasDifficulty = true
    }
  },
});

export function fetchAllWords(g: number,p: number) {
  // @ts-ignore
  return async dispatch => {
      const response = await fetchWords.get(g, p)
      dispatch(setSprintWords(response.data))
  }
}

const { actions, reducer } = sprintSlice;

export const { nextWord, setTranslated, setScore, gameOver, makeAnswer, setSprintWords, setSprintDifficult, setHasDifficulty } = actions;

export const wordsArr = (state: RootState) => state.sprint.wordsArr;
export const word = (state: RootState) => state.sprint.word;
export const translation = (state: RootState) => state.sprint.translation;
export const score = (state: RootState) => state.sprint.score;
export const isFinished = (state: RootState) => state.sprint.isFinished;
export const correctSeries = (state: RootState) => state.sprint.correctSeries;
export const pointsToAdd = (state: RootState) => state.sprint.pointsToAdd;
export const wrongAnswers = (state: RootState) => state.sprint.wrongAnswers;
export const correctAnswers = (state: RootState) => state.sprint.correctAnswers;
export const hasDifficulty = (state: RootState) => state.sprint.hasDifficulty;
export const difficulty = (state: RootState) => state.sprint.difficulty;

export default reducer;
