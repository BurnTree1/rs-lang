import React, { Dispatch, SetStateAction } from 'react';
import styles from './Savannah.module.scss';
import { ReactComponent as CometIcon } from './assets/image 24.svg';

type Props = {
  setGameStatus: Dispatch<SetStateAction<{ startView: boolean; getReadyView: boolean; settingsView: boolean }>>;
};
const StartView: React.FC<Props> = ({ setGameStatus }) => (
  <div className={styles.startViewContainer}>
    <CometIcon />
    <p>САВАННА</p>
    <p>Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.</p>
    <button
      type="button"
      onClick={() =>
        setGameStatus((prevState) => ({
          ...prevState,
          startView: false,
        }))
      }
    >
      НАЧАТЬ
    </button>
  </div>
);
export default StartView;
