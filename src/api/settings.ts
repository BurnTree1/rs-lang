import axios from "axios";
import { URL_API } from "../helpers";
import { LocalStorageService as userService } from './LocalStorageService'

export const settingsApi = {
  get() {
    return axios({
      url: `${URL_API}/users/${userService.getUserId()}/settings`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userService.getToken()}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  },
  set(params: object) {
    return axios({
      url: `${URL_API}/users/${userService.getUserId()}/settings`,
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${userService.getToken()}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      data: {
        optional: params
      },
      withCredentials: true
    });
  },
};
