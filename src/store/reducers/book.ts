import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";
import { WordType } from "../../types";

type Book = {
  sectionId: {
    pageId: {
      wordId: object;
    }
  }
}

const initialState = {};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    initPage: (state, { payload: { sectionId, pageId, words } }) => {
      words.forEach((word: WordType) => {
        const { _id: id } = word;
        set(state, [sectionId, pageId, id], word);
      });
    },
    setWord: (state, { payload: { sectionId, pageId, id, param } }) => {
      set(state, [sectionId, pageId, id, "userWord", "optional"], param);
    },
    deleteWord: (state, { payload: { sectionId, pageId, id } }) => {
      // @ts-ignore
      delete state[sectionId][pageId][id];
    }
  }
});

const { actions, reducer } = bookSlice;

export const { initPage, setWord, deleteWord } = actions;

export default reducer;
