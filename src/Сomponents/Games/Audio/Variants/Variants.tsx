import clsx from 'clsx';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAnswered, makeAnswer, setAnswered, word } from '../../../../store/reducers/audioSlice';
import styles from './Variants.module.scss';

type PropsType = {
  shuffledWords: Array<string>;
};
export const Variants: FC<PropsType> = ({ shuffledWords }) => {
  const learnedWord = useSelector(word);
  const answered = useSelector(isAnswered);
  const [correctWord, setCorrectWord] = useState('');
  const [wrongWord, setWrongWord] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    setCorrectWord('');
    setWrongWord('');
  }, [learnedWord]);
  const onAnswer = (w: string) => {
    dispatch(setAnswered(true));
    dispatch(makeAnswer(w));
    if (w !== learnedWord.ru) {
      setWrongWord(w);
    }
    setCorrectWord(learnedWord.ru);
  };
  const answerFromBoard = (index: number) => {
    onAnswer(shuffledWords[index]);
    document.removeEventListener('keydown', onAnswerSelect);
  }
  const onAnswerSelect = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === '1') {
        answerFromBoard(0)
      } else if (e.key === '2') {
        answerFromBoard(1)
      } else if (e.key === '3') {
        answerFromBoard(2)
      } else if (e.key === '4') {
        answerFromBoard(3)
      }
    },
    [shuffledWords]
  );
  useEffect(() => {
    document.addEventListener('keydown', onAnswerSelect);
    return () => {
      document.removeEventListener('keydown', onAnswerSelect);
    };
  }, [onAnswerSelect]);
  console.log(shuffledWords)
  return (
    <div className={styles.variants}>
      {shuffledWords.map((w: string, i: number) => (
        <button
          key={w}
          onClick={() => onAnswer(w)}
          disabled={answered}
          className={clsx(
            answered && learnedWord.ru === w ? styles.correct : styles.variant__text,
            wrongWord === w ? styles.wrong : styles.variant__text
          )}
          type="button"
        >
          {i + 1}.{w}
        </button>
      ))}
    </div>
  );
};
