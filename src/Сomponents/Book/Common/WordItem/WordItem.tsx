import React, { FC } from 'react';
import _ from 'lodash';
import useSound from 'use-sound';
import { Card } from '@material-ui/core';
import { useSelector } from "react-redux";
import shortid from 'shortid';
import ActionButtons from './ActionButtons';
import { URL_API } from '../../../../helpers';
import { getRandomColor } from '../../../../helpers/words.helper';
import listen from '../../../../assets/image/listen.svg';
import styles from './WordItem.module.scss';
import Statistic from "./WordStatistic";
import { isNeedTranslate, isNeedMeaningTranslate } from "../../../../store/reducers/settings";
import { authIsAuthorized } from "../../../../store/reducers/authorizationSlice";

type WordType = {
  id: string;
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
    optional: any;
  };
  refresh?: () => void;
};

const WordItem: FC<WordType> = ({
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
  userWord,
  refresh
}) => {
  const isShowTranslate = useSelector(isNeedTranslate);
  const isShowMeaningTranslate = useSelector(isNeedMeaningTranslate);
  const isAuth = useSelector(authIsAuthorized)
  const isHard = _.get(userWord, ['optional', 'isHard'], false);


  const [playWord, { stop: stopWord }] = useSound(`${URL_API}/${audio}`);
  const [playExplain, { stop: stopExplain }] = useSound(`${URL_API}/${audioMeaning}`);
  const [playExample, { stop: stopExample }] = useSound(`${URL_API}/${audioExample}`);
  const background = getRandomColor(word)


  const stopPlay = () => {
    stopExplain()
    stopWord()
    stopExample()
  }
  const onExplainPlay = () => {
    stopPlay()
    playExplain()
  }
  const onWordPlay = () => {
    stopPlay()
    playWord()
  }
  const onExamplePlay = () => {
    stopPlay()
    playExample()
  }

  const meaning = textMeaning
    .toLowerCase()
    .split(' ')
    .map((w) =>
      w.toLowerCase().includes(word.toLowerCase()) ? (
        <span key={w} className={styles.word__bold}>
          {w}
        </span>
      ) : (
        <span key={shortid()}>{w}</span>
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
        <span key={shortid()}>{w}</span>
      )
    );
  return (
    <div className={styles.card__wrapper}>
      <Card className={styles.card} style={{ background }}>
        <div className={styles.card__inner}>
          <div className={styles.card__desc}>
            <div style={{ background: `url(${URL_API}/${image}) no-repeat center`, backgroundSize: 'cover' }} className={styles.card__imgWrap}>
              word image
            </div>
            {(userWord && (userWord.optional.correct || userWord.optional.wrong)) && <Statistic info={userWord.optional}/>}
          </div>
          <div className={styles.word}>
            <div className={styles.word__title}>{word}</div>
            <div className={styles.word__transcription}>
              {transcription}
              <button onClick={onWordPlay} type="button" className={styles.listen}>
                <img src={listen} alt="listen" className={styles.listen__img} />
              </button>
            </div>
            {isShowTranslate && <div className={styles.word__translation}>{wordTranslate}</div>}
            <div className={styles.word__mean}>
              <div className={styles.word__inner}>{meaning}</div>
              <button onClick={onExplainPlay} type="button" className={styles.listen}>
                <img src={listen} alt="listen" className={styles.listen__img} />
              </button>
            </div>
            {isShowMeaningTranslate && <div className={styles.word__explain}>{textMeaningTranslate}</div>}
            <div className={styles.word__mean}>
            <div className={styles.word__inner}>{examples}</div>
              <button onClick={onExamplePlay} type="button" className={styles.listen}>
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
