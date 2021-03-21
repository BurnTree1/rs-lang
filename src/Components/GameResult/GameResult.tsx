import React, { FC } from 'react';
import styles from './GameResult.module.css';

type PropsType = {
  score: number;
};
export const GameResult: FC<PropsType> = ({ score }) => <div className={styles.result}>Your score: {score}</div>;
