import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const savannahSlice = createSlice({
  name: 'savannah',
  initialState,
  reducers: {
    consolelog(state, { payload: newName }) {
      state.value += 1;
    },
  },
});

export const { consolelog } = savannahSlice.actions;
export default savannahSlice.reducer;
