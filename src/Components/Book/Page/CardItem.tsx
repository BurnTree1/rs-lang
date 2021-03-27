import React, { FC, useState } from "react";

type WordType = {
  id: string,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

const CardItem: FC<WordType> = ({ id,
                                  word,
                                  image,
                                  audio,
                                  audioMeaning ,
                                  audioExample,
                                  textMeaning,
                                  textExample,
                                  transcription,
                                  wordTranslate,
                                  textMeaningTranslate,
                                  textExampleTranslate }) => {
  const [] = useState()
  return <div>
    {word}
  </div>;
};

export default CardItem
