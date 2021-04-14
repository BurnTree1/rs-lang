import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sound from '../../../../assets/image/listen-btn.svg';
import { URL_API } from '../../../../helpers/constants';
import { audioPlayed, canListen, isAnswered, isFinished, resetListenAttempts, word } from '../../../../store/reducers/audioSlice';
import styles from './Listening.module.scss'

export const Listening = () => {
  const learnedWord = useSelector(word);
  const finished = useSelector(isFinished);
  const answered = useSelector(isAnswered);
  const repeat = useSelector(canListen);
  const url = URL_API;
   const playCurrent = new Audio(`${url}/${learnedWord.audio}`);
   const dispatch = useDispatch()
  useEffect(() => {
    playCurrent.play();
    dispatch(resetListenAttempts())
  }, [learnedWord]);
  const onAudioPlay = () => {
    playCurrent.play();
    dispatch(audioPlayed())
  };
  return (
    <div className={styles.listen__wrap}>
      {!answered ? (
        <button onClick={onAudioPlay} disabled={finished || !repeat} type="button" className={styles.listen}>
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
