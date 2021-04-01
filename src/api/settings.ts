import axios from "axios";
import { URL_API, token, userId } from "../helpers";

export const settingsApi = {
  get() {
    return axios({
      url: `${URL_API}/users/${userId}/settings`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  },
  set(params: object) {
    return axios({
      url: `${URL_API}/users/${userId}/settings`,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
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
