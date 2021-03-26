import React from 'react';
import styles from '../Savannah/Savannah.module.scss';
import { WordsType } from '../Savannah/types';
import WrongAnswerList from '../Savannah/WrongAnswerList';

type Props = {
  wrongAnswers: WordsType;
  rightAnswers: WordsType;
};

const EndGameModal: React.FC<Props> = ({ wrongAnswers, rightAnswers }) => (
  <div className={styles.endModalContainer}>
    <div className={styles.endModalContent}>
      {wrongAnswers.length ? <p>Неплохо, но есть над чем поработать</p> : <p>Поздравляем, отличный результат!</p>}
      <div className={styles.endModalResultContainer}>
        <div className={styles.endModalWordsContainer}>
          {wrongAnswers.length ? (
            <>
              <span style={{ color: '#E10050' }}>ОШИБОК: {wrongAnswers.length}</span>
              {wrongAnswers.map((word) => (
                <WrongAnswerList word={word} key={word.id} />
              ))}
            </>
          ) : null}
          {rightAnswers.length ? (
            <>
              <span
                style={{
                  color: '#4CAF50',
                  paddingRight: 285,
                }}
              >
                ЗНАЮ: {rightAnswers.length}
              </span>
              {rightAnswers.map((word) => (
                <WrongAnswerList word={word} key={word.id} />
              ))}
            </>
          ) : null}
        </div>
      </div>
      <button type="button" className={styles.endModalButton}>
        Продолжить тренировку
      </button>
      <a className={styles.endModalLink}>К списку тренировок</a>
    </div>
  </div>
);
export default EndGameModal;
