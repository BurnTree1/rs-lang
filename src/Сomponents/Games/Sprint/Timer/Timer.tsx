import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { difficulty, gameOver } from '../../../../store/reducers/sprintSlice';
import styles from './Timer.module.scss'

type PropsType = {
  finished: boolean
  gameIsDone: boolean
}
export const Timer: FC<PropsType> = ({ finished, gameIsDone }) => {
  const initTime = useSelector(difficulty)
  const [time, setTime] = useState<number>(initTime);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeId = setInterval(() => {
      setTime(time - 1);
      if (time === 0) {
        dispatch(gameOver());
        setTime(0);
      }
    }, 1000);
    if (finished || gameIsDone) {
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
