import { IWord } from "../../../models/common.models";

export interface IState {
  cards: ICard[];
  size: number;
  firstCard: ICard | null;
  secondCard: ICard | null;
  isResumed: boolean;
  startTime: boolean;
  attempts: number;
  time: number;
  haveWin: boolean;
  fullScreen: boolean;
  soundToggle: boolean;
  isPaused: boolean;
}

export interface ICard extends IWord {
  isFlipped: boolean;
  found: boolean;
  isSecondCard?: boolean;
}

export const bookPath: { [k: string]: number } = {
  'Начальный': 0,
  'Легкий': 1,
  'Средний': 2,
  'Сложный': 3,
  'Великий': 4,
  'Невероятный': 5
};

export interface IGameSettings {
  section: string;
  difficult: string;
}

export interface ISettings {
  width: number;
  height: number;
  delay: number;
  theme: string;
  soundOn: boolean;
  musicOn: boolean;
  soundsVolume: number;
  musicVolume: number;
}

export interface IGameData {
  cards: ICard[];
  time: number;
  attempts: number;
  settings: ISettings;
  startTime?: boolean;
}

export interface IGameWinData {
  time: number;
  attempts: number;
  score: number;
  fieldSize: string;
}