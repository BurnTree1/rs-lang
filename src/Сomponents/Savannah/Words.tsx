import React, { useCallback, useEffect } from 'react';
import { WordsType } from './types';
import styles from './Savannah.module.scss';

type Props = {
  currentWords: WordsType;
  checkAnswer: (word: string) => void;
  livesLeft: number
};

const Words: React.FC<Props> = ({ currentWords, checkAnswer, livesLeft }) => {
  const onAnswerSelect = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === '1') {
        checkAnswer(currentWords[0].wordTranslate);
      } else if (e.key === '2') {
        checkAnswer(currentWords[1].wordTranslate);
      }
       else if (e.key === '3') {
        checkAnswer(currentWords[2].wordTranslate);
      }
       else if (e.key === '4') {
        checkAnswer(currentWords[3].wordTranslate);
      }
    },
    [checkAnswer]
  );
  useEffect(() => {
    document.addEventListener('keydown', onAnswerSelect);
    if (livesLeft === 0 ) {
      document.removeEventListener('keydown', onAnswerSelect);
    }
    return () => {
      document.removeEventListener('keydown', onAnswerSelect);
    };
  }, [currentWords, onAnswerSelect]);
  return (
  <div className={styles.wordsContainer}>
    {currentWords.map((word, idx) => (
      <span key={word.id} onClick={()=>checkAnswer(word.wordTranslate)}>{`${idx + 1}.${word.wordTranslate}`}</span>
    ))}
  </div>
)};

export default Words;
