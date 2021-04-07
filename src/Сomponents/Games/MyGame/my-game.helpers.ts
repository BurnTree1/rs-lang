import shortid from "shortid";
import { IWord } from "../../../models/common.models";
import { WordType } from "../../Savannah/types";
import { ICard, ISettings } from "./my-game.models";

const generateUniqCards = (words: IWord[], count: number): ICard[] => {
  const wordsCopy: IWord[] = [...words];
  let mixedCards: ICard[] = [];

  for (let i = 0; i < count; i += 1) {
    const wordToInsert: number = Math.floor(Math.random() * wordsCopy.length);
    const word = wordsCopy.splice(wordToInsert, 1)[0];
    mixedCards = [
      ...mixedCards,
      {
        isFlipped: true,
        isShown: true,
        found: false,
        ...word,
        key: '',
      }
    ];
  }
  return mixedCards;
};

const addMarker = (cards: ICard[]) => cards.map((card) => ({ ...card, isSecondCard: true }));

export const generateCards = (words: IWord[], settings: ISettings): ICard[] => {
  const size = words.length * 2;
  const count = words.length;

  const uniqCards: ICard[] = generateUniqCards(words, count);

  const tempCards: ICard[] = [...uniqCards, ...addMarker(uniqCards)];
  let mixedCards: ICard[] = [];

  for (let i = 0; i < size; i += 1) {
    const cardToInsert: number = Math.floor(Math.random() * tempCards.length);
    const card = tempCards.splice(cardToInsert, 1)[0];
    mixedCards = [...mixedCards, card];
  }

  mixedCards = mixedCards.map(card => ({ ...card, key: shortid() }));
  return mixedCards;
};

const addZero = (val: number) => String(val).length > 1 ? val : `0${val}`;

export const formatTime = (sec: number): string => {
  const seconds = sec % 60;
  const minutes = (sec - seconds) / 60;
  return `${addZero(minutes)} : ${addZero(seconds)}`;
};

// @ts-ignore
export const getWord = (words: IWord[], card: ICard): WordType => (words.find(({ id }) => id === card.id) as WordType);
