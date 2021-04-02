import React, { FC } from 'react';
import _ from 'lodash';
import useSound from 'use-sound';
import { Card } from '@material-ui/core';
import ActionButtons from './ActionButtons';
import { URL_API } from '../../../../helpers/constants';
import listen from '../../../../assets/image/listen.svg';
import styles from './WordItem.module.scss';

type WordType = {
  _id: string;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord: {
    optional: object;
  } | null;
};

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
  userWord,
}) => {
  const isHard = _.get(userWord, ['optional', 'isHard'], false);
  const [playWord] = useSound(`${URL_API}/${audio}`)
  const [playExplain] = useSound(`${URL_API}/${audioMeaning}`)
  const [playExample] = useSound(`${URL_API}/${audioExample}`)

  return (
    <div className={styles.card__wrapper}>
      <Card className={styles.card}>
        <div className={styles.card__inner}>
          <div className={styles.card__desc}>
            <img src={`${URL_API}/${image}`} alt="word image" className={styles.card__img} />
            <span className={styles.word__progress}>1000</span>
            <span className={styles.word__progress}>1000</span>
          </div>
          <div className={styles.word}>
            <div className={styles.word__title}>{word}</div>
            <div className={styles.word__transcription}>
              {transcription}
              <button onClick={()=>playWord()} type="button" className={styles.listen}>
                <img src={listen} alt="listen" className={styles.listen__img} />
              </button>
            </div>
            <div className={styles.word__translation}>{wordTranslate}</div>
            <div className={styles.word__explain}>
              {textMeaning}
              <button onClick={()=>playExplain()} type="button" className={styles.listen}>
                <img src={listen} alt="listen" className={styles.listen__img} />
              </button>
            </div>
            <div className={styles.word__explain}>
              {textExample}
              <button onClick={()=>playExample()} type="button" className={styles.listen}>
                <img src={listen} alt="listen" className={styles.listen__img} />
              </button>
            </div>
          </div>
        </div>
        <ActionButtons id={id} isHard={isHard} />
      </Card>
    </div>
  );
};

export default WordItem;
