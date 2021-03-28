import axios from 'axios';

const URL_API = "https://rs-lang2021.herokuapp.com"
const WORD_API = `${URL_API}/words`

export const wordsApi = {
  get(section: number, page: number) {
    return axios({
      method: "GET",
      url: `${WORD_API}`,
      params: {
        group: section, page
      }
    });
  }
};

const token = "";
const userId = ""

export const userWords = {
  get() {
    return axios({
      url: `${URL_API}/users/${userId}/words`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      withCredentials: true,
    })
  },

}

export const userAggregateWords = {
  get() {
    return axios({
      url: `${URL_API}/users/${userId}/words`,
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      withCredentials: true,
    })
  },
}
