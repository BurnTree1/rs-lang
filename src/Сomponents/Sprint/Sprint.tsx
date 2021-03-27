import React, { FC, useEffect } from 'react';
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
  correctSeries,
  pointsToAdd,
} from '../../store/reducers/sprintSlice';
import { GameResult } from '../GameResult/GameResult';
import styles from './Sprint.module.css';
import { Timer } from './Timer/Timer';

export const Sprint: FC = () => {
  const wordsArr = useSelector(words);
  const learnedWord = useSelector(word);
  const translatedWord = useSelector(translation);
  const gameScore = useSelector(score);
  const finished = useSelector(isFinished);
  const correct = useSelector(correctSeries);
  const points = useSelector(pointsToAdd);
  const dispatch = useDispatch();
  useEffect(() => {
    const random = Math.random();
    const randomIndex = Math.round(0 - 0.5 + Math.random() * (wordsArr.length - 1));
    if (random > 0.6) {
      dispatch(setTranslated(learnedWord));
    } else {
      dispatch(setTranslated(wordsArr[randomIndex]));
    }
  }, [learnedWord]);
  useEffect(() => {
    document.addEventListener('keydown', onAnswerSelect);
    if (finished) {
      document.removeEventListener('keydown', onAnswerSelect);
    }
    return () => {
      document.removeEventListener('keydown', onAnswerSelect);
    };
  }, [learnedWord, finished]);

  const onAnswerSelect = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      dispatch(setScore(true));
      dispatch(nextWord(learnedWord.en));
    } else if (e.key === 'ArrowLeft') {
      dispatch(setScore(false));
      dispatch(nextWord(learnedWord.en));
    }
  };
  const onTranslationConfirm = (isRight: boolean) => {
    dispatch(setScore(isRight));
    dispatch(nextWord(learnedWord.en));
  };
  return (
    <div className={styles.sprint}>
      <div className="score">Score: {gameScore}</div>
      <Timer />
      <div className="board">
        <div className="english">{learnedWord.en}</div>
        <div className="translated">{translatedWord.ru}</div>
        <div className="btns">
          <div className="points">+{points}</div>
          <button onClick={() => onTranslationConfirm(false)} disabled={finished} type="button">
            &larr; false
          </button>
          <button onClick={() => onTranslationConfirm(true)} disabled={finished} type="button">
            true &rarr;
          </button>
        </div>
        <div className="correct">Combo: {correct}</div>
      </div>
      {finished && <GameResult score={gameScore} />}
    </div>
  );
};
