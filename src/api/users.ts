import { AxiosResponse } from 'axios';
import axiosInstance from './AxiosInstance';
import { LocalStorageService } from './LocalStorageService';
import {  SignIn } from '../store/reducers/types';


type AuthorizationResponse = {
  message: string,
  refreshToken: string,
  token: string,
  userId: string
}


export const AppCreateNewUser = async (userData: FormData) => axiosInstance.post('signup', userData)
    .then((user: AxiosResponse<AuthorizationResponse>) => {
      LocalStorageService.setToken(user.data.token)
      LocalStorageService.setUserId(user.data.userId)
    })

export const AppGetUserData = async () => axiosInstance.get(`users/${LocalStorageService.getUserId()}`, {
  headers: {
    'Content-Type': 'text/plain'
  }
})

export const AppSignInUser = async (userData: SignIn) => axiosInstance.post("signin", userData);
