export interface IWord {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export enum Games {
  savannah = 'savannah',
  sprint = 'sprint',
  audio = 'audio',
  memoryGame = 'memoryGame'
}

export interface IGamesStatistics {
    learnedWords: number;
    rightAnswers: number;
    longestSeries: number;
}

export interface IAllGamesStatistics {
    [k: string]: {
        [k: string]: IGamesStatistics
    }
}

export interface IStatistics {
    learnedWords: number;
    optional: {
        games?: IAllGamesStatistics
    }
}
