import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store.models";

const initialState = {
  isNeedTranslate: true,
  isNeedMeaningTranslate: true,
  isNeedHardButton: true,
  isNeedDeleteButton: true
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, { payload: settings }) => settings
  }
});

const { actions, reducer } = settingsSlice;

export const { setSettings } = actions;

export const currentSettings = (state: RootState) => state.settings;
export const isNeedTranslate = (state: RootState) => state.settings.isNeedTranslate;
export const isNeedMeaningTranslate = (state: RootState) => state.settings.isNeedMeaningTranslate;
export const isNeedHardButton = (state: RootState) => state.settings.isNeedHardButton;
export const isNeedDeleteButton = (state: RootState) => state.settings.isNeedDeleteButton;

export default reducer;
