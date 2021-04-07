import { URL_API } from "./constants";
import { WordType } from "../types";

export const getSrcUrl = (path: string) => `${URL_API}/${path}`;

// eslint-disable-next-line no-underscore-dangle
export const rebaseWordId = (word: WordType) => ({ ...word, id: word._id })
