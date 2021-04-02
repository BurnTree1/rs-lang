import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppCreateNewUser } from '../../AppService';

export type AuthorizationState = {
  email: string,
  password: string
  image: string
}

const initialState: AuthorizationState = {
  email: "",
  password: "",
  image: ""
};

export const createNewUser = createAsyncThunk(
  'authorization/createNewUser',
  async (userData: AuthorizationState) => {
    console.log(userData)
    const response = await AppCreateNewUser(userData)
    return response.data
  }
)

const AuthorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      console.log(action.payload)
    })
  }
})

