import axios from "axios";
import { WORD_PER_PAGE, URL_API } from "../helpers";
import { and, choosePage, isDeleted } from "../helpers/filterBuilder";

const WORD_API = `${URL_API}/words`;

export const words = {
  get(group: number, page: number) {
    return axios({
      method: "GET",
      url: `${WORD_API}`,
      params: {
        group, page
      }
    });
  }
};

const token = "";
const userId = "";

export const userWords = {
  get(group: number, page: number) {
    return axios({
      url: `${URL_API}/users/${userId}/words`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      params: {
        group, page,
        wordsPerPage: WORD_PER_PAGE
      },
      withCredentials: true
    });
  },
  makeUserWord(wordId: string, param: object) {
    return axios({
      url: `${URL_API}/users/${userId}/words/${wordId}`,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      data: {
        optional: param
      },
      withCredentials: true
    });
  }

};

export const userAggregateWords = {
  get(group: number, page: number) {
    return axios({
      url: `${URL_API}/users/${userId}/aggregatedWords`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      params: {
        group,
        wordsPerPage: WORD_PER_PAGE,
        filter: and(choosePage(page), isDeleted(null))
      },
      withCredentials: true
    });
  },
};
