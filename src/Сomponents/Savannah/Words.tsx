import React from 'react';
import { WordsType } from './types';
import styles from './Savannah.module.scss';

type Props = {
  currentWords: WordsType;
  checkAnswer: (e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>) => void;
};

const Words: React.FC<Props> = ({ currentWords, checkAnswer }) => (
  <div className={styles.wordsContainer}>
    {currentWords.map((word, idx) => (
      <span key={word.id} onClick={checkAnswer}>{`${idx}.${word.wordTranslate}`}</span>
    ))}
  </div>
);

export default Words;
