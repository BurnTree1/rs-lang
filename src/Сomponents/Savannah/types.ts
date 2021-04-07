export type WordType = {
  id: string;
  _id: string;
  group: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWord? : {
    optional: {}
  };
};

export type WordsType = Array<WordType>;
