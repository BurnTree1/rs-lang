import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { AppCreateNewUser, AppGetUserData, AppSignInUser } from '../../api/users';
import { AuthorizationState, CreateNewUserType, SignIn } from './types';
import { RootState } from '../store.models';
import { LocalStorageService } from '../../api/LocalStorageService';

const initialState: AuthorizationState = {
  email: "",
  password: "",
  image: '',
  isAuthorized: false,
  isSignInSuccessfully: false
};

export type UserDataResponse = {
  id: string,
  email: string,
  photo: string
}

export type SignInResponse = {
  "message": string,
  "token": string,
  "refreshToken": string,
  "userId": string,
  "name": string
}

export type SignInReject = {
  error: Error
}

export const createNewUser = createAsyncThunk(
  'authorization/createNewUser',
  async (userData: CreateNewUserType, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('email', userData.email)
      formData.append('password', userData.password)
      formData.append('image', userData.image)
      await AppCreateNewUser(formData)
      return userData
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.messages })
    }
  }
)

export const getUserData = createAsyncThunk(
  'authorization/getUserData',
  async (_, thunkAPI) => {
      try {
        const userData: AxiosResponse<UserDataResponse> = await AppGetUserData();
        return userData.data
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.messages })
      }
  }
)

export const signInUser = createAsyncThunk(
  "authorization/signInUser",
  async (userData: SignIn, thunkAPI) => {
    try {
      const response: AxiosResponse<SignInResponse> = await AppSignInUser(userData).catch(err => err);
      LocalStorageService.setToken(response.data.token)
      LocalStorageService.setUserId(response.data.userId)
      thunkAPI.dispatch(await getUserData())
      thunkAPI.dispatch(updateSignInSuccessfullyStatus())
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.messages })
    }
  }
)

const AuthorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    updateAuthImage: (state, action) => {
      state.image = action.payload
    },
    updateSignInSuccessfullyStatus: (state) => {
      state.isSignInSuccessfully = true
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createNewUser.fulfilled, (state, action: PayloadAction<CreateNewUserType>) => {
        state.password = action.payload.password;
        state.email = action.payload.email;
        state.isAuthorized = true;
        state.isSignInSuccessfully = true;
      })
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<UserDataResponse>) => {
        state.password = action.payload.id;
        state.email = action.payload.email;
        state.image = action.payload.photo;
        state.isAuthorized = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isSignInSuccessfully = true;
        state.isAuthorized = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isSignInSuccessfully = false;
      })
  }
})

export const authImageSelector = (state: RootState) => state.auth.image;
export const authIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const authIsSignInSuccessfully = (state: RootState) => state.auth.isSignInSuccessfully;

export const { updateAuthImage, updateSignInSuccessfullyStatus } = AuthorizationSlice.actions;

export default AuthorizationSlice.reducer
