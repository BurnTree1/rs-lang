import React, { FC } from "react";
import _ from "lodash";
import { Card, IconButton } from "@material-ui/core";
import { ErrorOutlined, BlockOutlined } from "@material-ui/icons";

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
  textExampleTranslate: string,
  userWord: {
    optional: object
  } | null
}

const CardItem: FC<WordType> = ({
                                  id,
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

  // @ts-ignore
  return <Card>
      {word}
      {isHard ? "hard" : null}
      <IconButton>
        <ErrorOutlined/>
      </IconButton>
      <IconButton>
        <BlockOutlined/>
      </IconButton>
    </Card>
};

export default CardItem;
