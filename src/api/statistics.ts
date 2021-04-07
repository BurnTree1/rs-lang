import axios from "axios";
import { URL_API } from "../helpers";
import { LocalStorageService as userService } from './LocalStorageService'
import { IStatistics } from "../models/common.models";

export const userStatistics = {
  get() {
    return axios({
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userService.getToken()}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      url: `${URL_API}/users/${userService.getUserId()}/statistics`,
    });
  },
  put(value: IStatistics) {
    return axios({
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${userService.getToken()}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      url: `${URL_API}/users/${userService.getUserId()}/statistics`,
      data: value
    });
  }
};
