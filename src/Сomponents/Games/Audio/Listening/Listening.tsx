import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import sound from '../../../../assets/image/listen-btn.svg';
import { URL_API } from '../../../../helpers/constants';
import { useAudio } from '../../../../helpers/hooks';
import { isAnswered, isFinished, next, word } from '../../../../store/reducers/audioSlice';
import styles from './Listening.module.scss'

export const Listening = () => {
  const learnedWord = useSelector(word);
  const finished = useSelector(isFinished);
  const answered = useSelector(isAnswered);
  const url = URL_API;
   const playCurrent = new Audio(`${url}/${learnedWord.audio}`);
  useEffect(() => {
    playCurrent.play();
  }, [learnedWord]);
  const onAudioPlay = () => {
    playCurrent.play();
  };
  return (
    <div className={styles.listen__wrap}>
      {!answered ? (
        <button onClick={onAudioPlay} disabled={finished} type="button" className={styles.listen}>
          <img src={sound} alt="sound"/>
        </button>
      ) : (
        <div className={styles.listen__inner}>
          <img src={`${url}/${learnedWord.image}`} alt="word-img" className={styles.listen__img} />
          <div className={styles.listen__row}>
            <button onClick={onAudioPlay} type="button" className={styles.listen__btn}>
            <img src={sound} alt="sound"/>
            </button>
            <div className={styles.listen__text}>{learnedWord.word}</div>
          </div>
        </div>
      )}
    </div>
  );
};
