import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gameOver } from '../../../store/reducers/sprintSlice';

export const Timer: FC = () => {
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
    return () => {
      clearInterval(timeId);
    };
  });
  return (
    <div>
      <div className="time">Time: {time}</div>
    </div>
  );
};
