import React, { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import next from '../../../../assets/image/next.svg';
import { serviceContext } from '../../../../contexts/ServiceContext';
import { sendStatistics } from '../../../../helpers/statistics';
import { Games } from '../../../../models/common.models';
import { correctAnswers, isAnswered, isFinished, nextWord, setAnswered, setToWrongWords, word, wrongAnswers, longestSeries } from '../../../../store/reducers/audioSlice';
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
  const longestSeriesValue = useSelector(longestSeries);
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

  const { service } = useContext(serviceContext);

  useEffect(() => {
    if (finished) {
      sendStatistics({
        name: Games.audio,
        service,
        rightAnswers: wrongWords.length,
        wrongAnswers: correctWords.length,
        longestSeries: longestSeriesValue
      });
    }
  }, [finished, wrongWords, correctWords, longestSeriesValue, service]);

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
          <GamePauseModal setGameIsPaused={setGameIsPaused} setGameIsDone={setGameIsDone} />
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
