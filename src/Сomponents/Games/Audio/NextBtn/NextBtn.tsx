import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import next from '../../../../assets/image/next.svg';
import { isAnswered, nextWord, setAnswered, word } from '../../../../store/reducers/audioSlice';
import styles from './NextBtn.module.scss'

export const NextBtn = () => {
  const dispatch = useDispatch();
  const learnedWord = useSelector(word);
  const answered = useSelector(isAnswered);
  const onNextWord = () => {
    dispatch(nextWord(learnedWord));
    dispatch(setAnswered(false));
  };
  const onAnswer = () => {
    dispatch(setAnswered(true));
  };
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
    </div>
  );
};
