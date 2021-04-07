import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import next from '../../../../assets/image/next.svg';
import { correctAnswers, isAnswered, isFinished, nextWord, setAnswered, setToWrongWords, word, wrongAnswers } from '../../../../store/reducers/audioSlice';
import EndGameModal from '../../../Modals/EndGameModal';
import GamePauseModal from '../../../Modals/GamePauseModal';
import { TopPanel } from '../../Sprint/TopPanel/TopPanel';
import styles from './NextBtn.module.scss'

type PropsType = {
  submitGameOver: ()=> void
}
export const NextBtn: FC<PropsType> = ({ submitGameOver }) => {
  const dispatch = useDispatch();
  const learnedWord = useSelector(word);
  const answered = useSelector(isAnswered);
  const wrongWords = useSelector(wrongAnswers);
  const correctWords = useSelector(correctAnswers);
  const finished = useSelector(isFinished);
  const [gameIsPaused, setGameIsPaused] = useState<boolean>(false);
  const [gameIsDone, setGameIsDone] = useState<boolean>(false);
  const onNextWord = () => {
    dispatch(nextWord(learnedWord));
    dispatch(setAnswered(false));
  };
  const onAnswer = () => {
    dispatch(setAnswered(true));
    dispatch(setToWrongWords(learnedWord))
  };
  useEffect(() => {
    if(gameIsDone) {
      submitGameOver()
    }
  }, [gameIsDone]);
  return (
    <div className={styles.next}>
      {answered ? (
        <button onClick={onNextWord} type="button" className={styles.next__btn}>
          <img src={next} alt="next" className={styles.next__img} />
        </button>
      ) : (
        <button onClick={onAnswer} type="button" className={styles.next__btn}>
          НЕ ЗНАЮ
        </button>
      )}
      <TopPanel setGameIsPaused={setGameIsPaused} />
      {gameIsPaused && (
        <div className={styles.overlay}>
          <GamePauseModal setGameIsPaused={setGameIsPaused} setGameIsDone={setGameIsDone} onCloseGame={submitGameOver}/>
        </div>
      )}
      {finished && (
        <>
          <div className={styles.overlay} />
          <EndGameModal wrongAnswers={wrongWords} rightAnswers={correctWords} submit={submitGameOver}/>
        </>
      )}
    </div>
  );
};
