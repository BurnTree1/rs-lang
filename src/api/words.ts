import axios from "axios";
import { WORD_PER_PAGE, URL_API } from "../helpers";

const WORD_API = `${URL_API}/words`;

export const fetchWords = {
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

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWE0NGUyMjg5OGJmMzVlNDRiZmYwNCIsImlhdCI6MTYxNzEzNTI2MiwiZXhwIjoxNjE3MTQ5NjYyfQ.aDaK6Ogo80CEltlHMWkqOM3f2LUjLWiZaYeOHD8_Ris";
const userId = "605a44e22898bf35e44bff04";

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
        filter: { "$and": [{ "page": page, "userWord.optional.isDeleted": null }] }
      },
      withCredentials: true
    });
  }
};
