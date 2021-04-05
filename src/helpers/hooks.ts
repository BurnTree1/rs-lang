import useSound from 'use-sound';
import { WordsType } from '../store/reducers/audioSlice';
import cosmo_2 from '../assets/image/cosmo_2.png';
import cosmo_3 from '../assets/image/cosmo_3.png';
import cosmo_4 from '../assets/image/cosmo_4.png';
import cosmo_1 from '../assets/image/cosmo_1.png';

export const useRandom = (length: number) => {
  const random = Math.random();
  const randomIndex = Math.round(0 - 0.5 + Math.random() * (length - 1));
  return { random, randomIndex };
};

export const useAudio = (sound: string) => {
  const [play] = useSound(sound);
  return play;
};

export const useShuffle = (array: Array<WordsType>, word: string) => {
  const shuffledArr = array.filter((w: WordsType) => w.wordTranslate !== word).sort(() => Math.random() - 0.5);
  return [shuffledArr[0].wordTranslate, shuffledArr[1].wordTranslate, shuffledArr[2].wordTranslate, word].sort(
    () => Math.random() - 0.5
  );
};

export const useRandomPage = () => {
  const MAX_PAGE = 29;
  return Math.floor(Math.random() * MAX_PAGE);
};

export const useIconsArray = (points: number) => {
  const array = [cosmo_1, cosmo_2, cosmo_3, cosmo_4];
  if (points === 80) {
    array.length = 4;
  } else if (points === 40) {
    array.length = 3;
  } else if (points === 20) {
    array.length = 2;
  } else if (points === 10) {
    array.length = 1;
  }
  return array;
};
