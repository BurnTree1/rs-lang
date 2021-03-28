import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gameOver } from '../../../../store/reducers/sprintSlice';
import styles from './Timer.module.scss'

type PropsType = {
  finished: boolean
}
export const Timer: FC<PropsType> = ({ finished }) => {
  const GAME_TIME = 60;
  const [time, setTime] = useState<number>(GAME_TIME);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeId = setInterval(() => {
      setTime(time - 1);
      if (time === 0) {
        dispatch(gameOver());
        setTime(0);
      }
    }, 1000);
    if (finished) {
      clearInterval(timeId)
    }
    return () => {
      clearInterval(timeId);
    };
  },[time, finished, dispatch]);
  return (
    <div className={styles.time}>
      <div className={styles.time__text}>{time}</div>
    </div>
  );
};
