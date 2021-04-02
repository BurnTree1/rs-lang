import React from 'react';
import styles from './WinModal.module.scss';

interface IProps {
  cardsCount: number;
  attempts: number;
  submit(): void;
}

export const WinModal: React.FC<IProps> = ({ cardsCount, attempts, submit }) => (
  <div className={styles.endModalContainer}>
    <div className={styles.endModalContent}>
      {cardsCount !== attempts ? <p>Неплохо, но есть над чем поработать</p> : <p>Поздравляем, отличный результат!</p>}
      <div className={styles.endModalResultContainer}>
        <div className={styles.endModalWordsContainer}>
          {cardsCount !== attempts ? (
            <>
              <span style={{ color: '#E10050' }}>ОШИБОК: {attempts - cardsCount}</span>
            </>
          ) : null}
          {cardsCount ? (
            <>
              <span
                style={{
                  color: '#4CAF50',
                  paddingRight: 285,
                }}
              >
                ЗНАЮ: {cardsCount}
              </span>
            </>
          ) : null}
        </div>
      </div>
      <button type="button" className={styles.endModalButton} onClick={submit}>
        Новая тренировка
      </button>
    </div>
  </div>
);
