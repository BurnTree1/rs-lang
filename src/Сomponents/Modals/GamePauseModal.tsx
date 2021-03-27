import React, { Dispatch, SetStateAction } from 'react';
import styles from '../Savannah/Savannah.module.scss';

type Props = {
  setGameIsPaused: Dispatch<SetStateAction<boolean>>;
  setGameIsDone: Dispatch<SetStateAction<boolean>>;
};

const GamePauseModal: React.FC<Props> = ({ setGameIsPaused, setGameIsDone }) => (
  <div className={styles.pauseModalContainer}>
    <span>Тренировка не закончена!</span>
    <p>Если вы не вернетесь к списку, ваши результаты не будут сохранены</p>
    <div className={styles.pauseModalWordContainer}>
      <button type="button" onClick={() => setGameIsPaused(false)}>
        ОТМЕНА
      </button>
      <button type="button" onClick={() => setGameIsDone(true)}>
        ЗАКРЫТЬ
      </button>
    </div>
  </div>
);

export default GamePauseModal;
