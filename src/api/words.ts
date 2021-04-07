import axios from "axios";
import { WORD_PER_PAGE, URL_API, token, userId } from "../helpers";
import { and, choosePage, correct, isDeleted, isHard, not, or, wrong } from "../helpers/filterBuilder";

const WORD_API = `${URL_API}/words`;

export const fetchWords = {
  get(group: number, page: number) {
    return axios({
      method: "GET",
      url: `${WORD_API}`,
      params: {
        group, page
      },
    });
  }
};

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
  get(group: number|null, page: number|null, wordsPerPage: number|null, filter: object|null) {
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
        page,
        wordsPerPage,
        filter
      },
      withCredentials: true
    });
  },
  getForBook(group: number, pageId: number) {
    return userAggregateWords.get(group, null, WORD_PER_PAGE, and(choosePage(pageId), isDeleted(null)))
      .then(({ data }) => ({ data: data[0].paginatedResults }))
  },
  getForStudied(group: number, pageId: number) {
    return this.get(group, pageId, WORD_PER_PAGE, or(not(correct(null)),not(wrong(null)), isHard(true)))
  },
  getForHard(group: number, pageId: number) {
    return this.get(group, pageId, WORD_PER_PAGE, isHard(true))
  },
  getForDeleted(group: number, pageId: number) {
    return this.get(group, pageId, WORD_PER_PAGE, isDeleted(true))
  },
};
