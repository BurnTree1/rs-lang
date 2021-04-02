import { createSlice } from '@reduxjs/toolkit';
import { fetchWords } from '../../api/words';
import { IWord } from '../../models/common.models';
import { RootState } from '../store.models';

interface InitialState {
  wordsArr: IWord[];
  hasDifficulty: boolean;
  loading: boolean;
}

const initialState: InitialState = {
  wordsArr: [],
  hasDifficulty: true,
  loading: false,
};

const memoryGameSlice = createSlice({
  name: 'memoryGame',
  initialState,
  reducers: {
    setMemoryGameWords: (state, { payload: fetchedWords }) => {
      state.wordsArr = [...(Object.values(fetchedWords) as IWord[])];
      state.hasDifficulty = false;
      state.loading = false;
    },
    clearWords: (state) => {
      state.wordsArr = [];
      state.hasDifficulty = true;
    },
    startFetching: (state) => {
      state.loading = true;
    }
  },
});

export function fetchAllWords(g: number,p: number) {
  // @ts-ignore
  return dispatch => {
      dispatch(startFetching());
      fetchWords.get(g, p)
        .then((response) => {
          dispatch(setMemoryGameWords(response.data));
        });
  }
}

const { actions, reducer } = memoryGameSlice;

export const { setMemoryGameWords, clearWords, startFetching } = actions;

export const wordsArr = (state: RootState) => state.memoryGame.wordsArr;
export const hasDifficulty = (state: RootState) => state.memoryGame.hasDifficulty;
export const loading = (state: RootState) => state.memoryGame.loading;

export default reducer;
