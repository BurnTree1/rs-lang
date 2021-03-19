import { ThunkAction, Action } from '@reduxjs/toolkit';
// import { store } from './store';

export type RootState = ReturnType<any>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;