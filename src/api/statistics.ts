import axios from "axios";
import { URL_API, token, userId } from "../helpers";

export const userStatistics = {
  get() {
    return axios({
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      url: `${URL_API}/users/${userId}/statistics`,
    });
  },
  put() {
    return axios({
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      url: `${URL_API}/users/${userId}/statistics`,
      data: {
        learnedWords: 0,
        optional: {
          learnedWords: 10,
        }
      },
    });
  }
};
