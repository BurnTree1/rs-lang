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
        const { _id: id } = word
        set(state, [sectionId, pageId, id], word);
      });
    }
  }
});

const { actions, reducer } = bookSlice;

export const { initPage } = actions;

export default reducer;
