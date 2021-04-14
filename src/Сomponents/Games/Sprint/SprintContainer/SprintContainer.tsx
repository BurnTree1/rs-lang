import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Sprint } from '../Sprint';
import styles from './SprintContainer.module.scss';
import icon from '../../../../assets/image/sprint-start-icon.svg';
import { GameLayer } from '../../GameLayer/GameLayer';
import { setHasDifficulty } from '../../../../store/reducers/sprintSlice';

export const SprintContainer: FC = () => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const submitGameOver = () => {
    setIsGameStarted(false)
    dispatch(setHasDifficulty(true))
  }
  const dispatch = useDispatch()
  // useEffect(()=> {
  //  dispatch(setHasDifficulty(true))
  // },[])
  return (
    <div className={styles.sprint__wrapper}>
      <GameLayer difficultType='время игры' isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted}>
      <img src={icon} alt="icon" className={styles.sprint__icon} />
        <div className={styles.title}>СПРИНТ</div>
        <div className={styles.text}>
          Тренировка Спринт развивает скорость перевода. Чем правильнее ты отвечаешь, тем больше бонуса получаешь.
        </div>
      </GameLayer>
      {isGameStarted && <Sprint submitGameOver={submitGameOver}/>}
    </div>
  );
};
