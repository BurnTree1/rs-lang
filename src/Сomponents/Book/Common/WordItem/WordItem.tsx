import React, { FC } from 'react';
import _ from 'lodash';
import useSound from 'use-sound';
import { Card } from '@material-ui/core';
import { useSelector } from "react-redux";
import ActionButtons from './ActionButtons';
import { URL_API, isAuth } from '../../../../helpers';
import listen from '../../../../assets/image/listen.svg';
import styles from './WordItem.module.scss';
import { isNeedTranslate, isNeedMeaningTranslate } from "../../../../store/reducers/settings";

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
  userWord?: {
    optional: object;
  };
  refresh?: () => void;
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
  refresh
}) => {
  const isShowTranslate = useSelector(isNeedTranslate);
  const isShowMeaningTranslate = useSelector(isNeedMeaningTranslate);
  const isHard = _.get(userWord, ['optional', 'isHard'], false);

  const [playWord] = useSound(`${URL_API}/${audio}`);
  const [playExplain] = useSound(`${URL_API}/${audioMeaning}`);
  const [playExample] = useSound(`${URL_API}/${audioExample}`);

  const meaning = textMeaning
    .toLowerCase()
    .split(' ')
    .map((w) =>
      w.toLowerCase().includes(word.toLowerCase()) ? (
        <span key={w} className={styles.word__bold}>
          {w}
        </span>
      ) : (
        <span>{w}</span>
      )
    );
  const examples = textExample
    .toLowerCase()
    .split(' ')
    .map((w) =>
    w.toLowerCase().includes(word.toLowerCase()) ? (
        <span key={w} className={styles.word__bold}>
          {w}
        </span>
      ) : (
        <span>{w}</span>
      )
    );
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
              <button onClick={() => playWord()} type="button" className={styles.listen}>
                <img src={listen} alt="listen" className={styles.listen__img} />
              </button>
            </div>
            {isShowTranslate && <div className={styles.word__translation}>{wordTranslate}</div>}
            <div className={styles.word__mean}>
              <div className={styles.word__inner}>{meaning}</div>
              <button onClick={() => playExplain()} type="button" className={styles.listen}>
                <img src={listen} alt="listen" className={styles.listen__img} />
              </button>
            </div>
            {isShowMeaningTranslate && <div className={styles.word__explain}>{textMeaningTranslate}</div>}
            <div className={styles.word__mean}>
            <div className={styles.word__inner}>{examples}</div>
              <button onClick={() => playExample()} type="button" className={styles.listen}>
                <img src={listen} alt="listen" className={styles.listen__img} />
              </button>
            </div>
            <div className={styles.word__explain}>{textExampleTranslate}</div>
          </div>
        </div>
        {isAuth && <ActionButtons id={id} isHard={isHard} refresh={refresh}/>}
      </Card>
    </div>
  );
};

export default WordItem;
