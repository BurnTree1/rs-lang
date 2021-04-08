import clsx from 'clsx';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAnswered, makeAnswer, setAnswered, word, WordsType } from '../../../../store/reducers/audioSlice';
import styles from './Variants.module.scss';
// @ts-ignore
import wrong from '../../../../assets/sounds/sprint-wrong.wav'
// @ts-ignore
import correct from '../../../../assets/sounds/sprint-correct.mp3'

type PropsType = {
  shuffledWords: Array<WordsType>;
};
export const Variants: FC<PropsType> = ({ shuffledWords }) => {
  const learnedWord = useSelector(word);
  const answered = useSelector(isAnswered);
  const [correctWord, setCorrectWord] = useState('');
  const [wrongWord, setWrongWord] = useState('');
  const dispatch = useDispatch();
  const playWrong = new Audio(wrong)
  const playCorrect = new Audio(correct)
  useEffect(() => {
    setCorrectWord('');
    setWrongWord('');
  }, [learnedWord]);
  const onAnswer = (w: string) => {
    dispatch(setAnswered(true));
    dispatch(makeAnswer(w));
    if (w !== learnedWord.wordTranslate) {
      setWrongWord(w);
      playWrong.play()
    } else {
      playCorrect.play()
    }
    setCorrectWord(learnedWord.wordTranslate);
  };
  const answerFromBoard = (index: number) => {
    onAnswer(shuffledWords[index].wordTranslate);
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
  return (
    <div className={styles.variants}>
      {shuffledWords.map((w: WordsType, i: number) => (
        <button
          key={w.wordTranslate}
          onClick={() => onAnswer(w.wordTranslate)}
          disabled={answered}
          className={clsx(
            answered && learnedWord.wordTranslate === w.wordTranslate ? styles.correct : styles.variant__text,
            wrongWord === w.wordTranslate ? styles.wrong : styles.variant__text
          )}
          type="button"
        >
          {i + 1}.{w.wordTranslate}
        </button>
      ))}
    </div>
  );
};
