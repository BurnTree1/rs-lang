import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import {
  word,
  nextWord,
  translation,
  setTranslated,
  setScore,
  score,
  isFinished,
  pointsToAdd,
  wrongAnswers,
  correctAnswers,
  wordsArr,
} from '../../../store/reducers/sprintSlice';
import styles from './Sprint.module.scss';
import { Timer } from './Timer/Timer';
import volume from '../../../assets/image/volume.svg';
import rocket from '../../../assets/image/rocket.svg';
import arrow from '../../../assets/image/arrow.svg';
import { useRandom } from '../../../helpers/hooks';
import { CorrectCombo } from './CorrectCombo/CorrectCombo';
import { Spacemen } from './Spacemen/Spacemen';
import { TopPanel } from './TopPanel/TopPanel';
import EndGameModal from '../../Modals/EndGameModal';
import GamePauseModal from '../../Modals/GamePauseModal';
import { URL_API } from '../../../helpers';
// @ts-ignore
import correct from '../../../assets/sounds/sprint-correct.mp3';
// @ts-ignore
import wrong from '../../../assets/sounds/sprint-wrong.wav';

export const Sprint: FC = () => {
  const words = useSelector(wordsArr);
  const learnedWord = useSelector(word);
  const translatedWord = useSelector(translation);
  const gameScore = useSelector(score);
  const finished = useSelector(isFinished);
  const points = useSelector(pointsToAdd);
  const wrongWords = useSelector(wrongAnswers);
  const correctWords = useSelector(correctAnswers);
  const [gameIsPaused, setGameIsPaused] = useState<boolean>(false);
  const [gameIsDone, setGameIsDone] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [play] = useSound(`${URL_API}/${learnedWord.audio}`);
  const playCorrect = new Audio(correct);
  const playWrong = new Audio(wrong);
  const { random, randomIndex } = useRandom(words.length);
  useEffect(() => {
    if (random > 0.6) {
      dispatch(setTranslated(learnedWord.wordTranslate));
    } else {
      dispatch(setTranslated(words[randomIndex].wordTranslate));
    }
  }, [learnedWord]);
  const onTranslationConfirm = useCallback(
    (isRight: boolean) => {
      if ((learnedWord.wordTranslate === translatedWord) === isRight) {
        playCorrect.play();
      } else {
        playWrong.play();
      }
      dispatch(setScore(isRight));
      dispatch(nextWord(learnedWord.word));
    },
    [learnedWord.word, translatedWord, dispatch]
  );
  const onAnswerSelect = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'ArrowRight') {
        onTranslationConfirm(true);
      } else if (e.key === 'ArrowLeft') {
        onTranslationConfirm(false);
      }
    },
    [onTranslationConfirm]
  );
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
        <CorrectCombo />
        <div className={styles.points}>+{points}</div>
        <Spacemen />
        <img src={rocket} alt="rocket" className={styles.rocket} />
        <div className={styles.english}>{learnedWord.word}</div>
        <div className={styles.translated}>{translatedWord}</div>
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
        <button type="button" onClick={() => play()} className={styles.volume__btn}>
          <img src={volume} alt="volume" className={styles.volume} />
        </button>
        <div className={styles.score}>
          Score<span>{gameScore}</span>
        </div>
        <Timer finished={finished} gameIsDone={gameIsDone} />
      </div>
      <TopPanel setGameIsPaused={setGameIsPaused} />
      {gameIsPaused && (
        <div className={styles.overlay}>
          <GamePauseModal setGameIsPaused={setGameIsPaused} setGameIsDone={setGameIsDone} />
        </div>
      )}
      {(gameIsDone || finished) && (
        <>
          <div className={styles.overlay} />
          <EndGameModal wrongAnswers={wrongWords} rightAnswers={correctWords} />
        </>
      )}
    </div>
  );
};
