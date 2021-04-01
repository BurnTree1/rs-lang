import React, { FC } from "react";
import _ from "lodash";
import { Card } from "@material-ui/core";
import ActionButtons from "./ActionButtons";

type WordType = {
  _id: string,
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
  textExampleTranslate: string,
  userWord: {
    optional: object
  } | null
}

const WordItem: FC<WordType> = ({
                                  _id: id,
                                  word,
                                  image,
                                  audio,
                                  audioMeaning,
                                  audioExample,
                                  textMeaning,
                                  textExample,
                                  transcription,
                                  wordTranslate,
                                  textMeaningTranslate,
                                  textExampleTranslate,
                                  userWord
                                }) => {

  const isHard = _.get(userWord, ["optional", "isHard"], false);

  return <Card>
      {word}
      <ActionButtons id={id} isHard={isHard}/>
    </Card>
};

export default WordItem;
