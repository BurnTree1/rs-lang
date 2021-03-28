import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  word,
  words,
  nextWord,
  translation,
  setTranslated,
  setScore,
  score,
  isFinished,
  pointsToAdd,
} from '../../../store/reducers/sprintSlice';
import { GameResult } from '../GameResult/GameResult';
import styles from './Sprint.module.scss';
import { Timer } from './Timer/Timer';
import volume from '../../../assets/image/volume.svg';
import rocket from '../../../assets/image/rocket.svg';
import arrow from '../../../assets/image/arrow.svg';
import { useRandom } from '../../../helpers/hooks';
import { CorrectCombo } from './CorrectCombo/CorrectCombo';
import { Spacemen } from './Spacemen/Spacemen';
import { TopPanel } from './TopPanel/TopPanel';

export const Sprint: FC = () => {
  const wordsArr = useSelector(words);
  const learnedWord = useSelector(word);
  const translatedWord = useSelector(translation);
  const gameScore = useSelector(score);
  const finished = useSelector(isFinished);
  const points = useSelector(pointsToAdd);
  const dispatch = useDispatch();
  const { random, randomIndex } = useRandom(wordsArr.length)
  useEffect(() => {
    if (random > 0.6) {
      dispatch(setTranslated(learnedWord));
    } else {
      dispatch(setTranslated(wordsArr[randomIndex]));
    }
  }, [learnedWord, dispatch, random, randomIndex, wordsArr]);
  const onTranslationConfirm = useCallback((isRight: boolean) => {
    dispatch(setScore(isRight));
    dispatch(nextWord(learnedWord.en));
  },[learnedWord.en, dispatch]);
  const onAnswerSelect = useCallback((e: KeyboardEvent): void => {
    if (e.key === 'ArrowRight') {
      onTranslationConfirm(true)
    } else if (e.key === 'ArrowLeft') {
      onTranslationConfirm(false)
    }
  },[onTranslationConfirm]);
  useEffect(() => {
    document.addEventListener('keydown', onAnswerSelect);
    if (finished) {
      document.removeEventListener('keydown', onAnswerSelect);
    }
    return () => {
      document.removeEventListener('keydown', onAnswerSelect);
    };
  }, [learnedWord, finished, onAnswerSelect]);
  return (
    <div className={styles.sprint}>
      <div className={styles.board}>
        <CorrectCombo/>
        <div className={styles.points}>+{points}</div>
        <Spacemen/>
        <img src={rocket} alt="rocket" className={styles.rocket} />
        <div className={styles.english}>{learnedWord.en}</div>
        <div className={styles.translated}>{translatedWord.ru}</div>
        <div className={styles.btns}>
          <button
            onClick={() => onTranslationConfirm(false)}
            disabled={finished}
            type="button"
            className={styles.board__btn}
          >
            Неверно
          </button>
          <button
            onClick={() => onTranslationConfirm(true)}
            disabled={finished}
            type="button"
            className={styles.board__btn}
          >
            Верно
          </button>
        </div>
        <div className={styles.arrows}>
          <img src={arrow} alt="arrow" className={styles.arrow} />
          <img src={arrow} alt="arrow" className={styles.arrow} />
        </div>
        <img src={volume} alt="volume" className={styles.volume} />
        <div className={styles.score}>Score<span>{gameScore}</span></div>
        <Timer finished={finished} />
      </div>
      {finished && <GameResult score={gameScore} />}
      <TopPanel/>
    </div>
  );
};
