import React, { useEffect, useState } from 'react';
import { Sprint } from '../Sprint';
import styles from './SprintContainer.module.scss';
import icon from '../../../assets/image/sprint-start-icon.svg';

export const SprintContainer = () => {
  const LOADER_TIME = 3;
  const [isStartPressed, setIsStartPressed] = useState<boolean>(false);
  const [startGame, setStartGame] = useState<boolean>(true);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [gameLoader, setGameLoader] = useState<boolean>(false);
  const [loaderSec, setLoaderSec] = useState<number>(LOADER_TIME);
  useEffect(() => {
    const loaderId = setInterval(() => {
      if (gameLoader) {
        setLoaderSec(loaderSec - 1);
        if (loaderSec === 1) {
          setIsGameStarted(true);
          setGameLoader(false);
        }
      }
    }, 1000);
    return () => {
      clearInterval(loaderId);
    };
  }, [gameLoader, loaderSec]);
  const onGameStart = () => {
    setStartGame(false);
    setGameLoader(true);
  };
  return (
    <div className={styles.sprint__wrapper}>
      {startGame && (
        <div className={styles.sprint__start}>
          <img src={icon} alt="icon" className={styles.sprint__icon} />
          <div className={styles.title}>СПРИНТ</div>
          <div className={styles.text}>
            Тренировка Спринт развивает скорость перевода. Чем правильнее ты отвечаешь, тем больше бонуса получаешь.
          </div>
          <button onClick={onGameStart} type="button" className={styles.start__btn}>
            НАЧАТЬ
          </button>
        </div>
      )}
      {gameLoader && <div className={styles.loader}>{loaderSec}</div>}
      {isGameStarted && <Sprint />}
    </div>
  );
};
