import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";
import { WordType } from "../../types";
import { RootState } from "../store.models";

type Book = {
  sectionId: {
    pageId: {
      wordId: object;
    }
  },
  pageType: string
}

const initialState = {};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    initPage: (state, { payload: { sectionId, pageId, words } }) => {
      set(state, [sectionId, pageId], {})
      words.forEach((word: WordType) => {
        // eslint-disable-next-line no-underscore-dangle
        const id  = (word._id) ? word._id : word.id;
        set(state, [sectionId, pageId, id], { ...word, id });
      });
    },
    setWord: (state, { payload: { sectionId, pageId, id, params } }) => {
      set(state, [sectionId, pageId, id, "userWord", "optional"], params);
    },
    deleteWord: (state, { payload: { sectionId, pageId, id } }) => {
      // @ts-ignore
      delete state[sectionId][pageId][id];
    },
    setType: (state, { payload : pageType }) => {
      // @ts-ignore
      state.pageType = pageType
    }
  }
});

const { actions, reducer } = bookSlice;

export const { initPage, setWord, deleteWord, setType } = actions;

export const pageType = (state: RootState) => state.book.pageType

export default reducer;
