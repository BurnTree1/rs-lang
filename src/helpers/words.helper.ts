import { URL_API } from "./constants";
import { WordType } from "../types";

export const getSrcUrl = (path: string) => `${URL_API}/${path}`;

export const getRandomColor = (text: string) => {
  const colorChars = text.substr(text.length - 3);
  const r = 2 * colorChars.charCodeAt(0);
  const g = 2 * colorChars.charCodeAt(1);
  const b = 2 * colorChars.charCodeAt(2);
  return `rgba(${r}, ${g}, ${b}, 0.5)`;
};


// eslint-disable-next-line no-underscore-dangle
export const rebaseWordId = (word: WordType) => ({ ...word, id: word._id })
