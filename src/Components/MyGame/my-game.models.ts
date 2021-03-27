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
}

export interface ICard {
  image: Cards;
  isFlipped: boolean;
  id: string;
  found: boolean;
}

export enum Cards {
  'card1' = 'card1',
  'card2' = 'card2',
  'card3' = 'card3',
  'card4' = 'card4',
  'card5' = 'card5',
  'card6' = 'card6',
  'card7' = 'card7',
  'card8' = 'card8',
  'card9' = 'card9',
  'card10' = 'card10',
  'card11' = 'card11',
  'card12' = 'card12'
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