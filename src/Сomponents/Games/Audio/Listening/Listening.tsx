import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import sound from '../../../../assets/image/listen-btn.svg';
import { useAudio } from '../../../../helpers/hooks';
import { isAnswered, next, word } from '../../../../store/reducers/audioSlice';
import styles from './Listening.module.scss'

export const Listening = () => {
  const learnedWord = useSelector(word);
  const nextWord = useSelector(next);
  const answered = useSelector(isAnswered);
  const playNext = useAudio(nextWord.audio);
  const playCurrent = useAudio(learnedWord.audio);
  useEffect(() => {
    playNext();
  }, [learnedWord]);
  const onAudioPlay = () => {
    playCurrent();
  };
  return (
    <div className={styles.listen__wrap}>
      {!answered ? (
        <button onClick={onAudioPlay} type="button" className={styles.listen}>
          <img src={sound} alt="sound"/>
        </button>
      ) : (
        <div className={styles.listen__inner}>
          <img src={learnedWord.image} alt="word-img" className={styles.listen__img} />
          <div className={styles.listen__row}>
            <button onClick={onAudioPlay} type="button" className={styles.listen__btn}>
            <img src={sound} alt="sound"/>
            </button>
            <div className={styles.listen__text}>{learnedWord.en}</div>
          </div>
        </div>
      )}
    </div>
  );
};
