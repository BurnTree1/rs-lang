import React from 'react'
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { correctSeries } from '../../../../store/reducers/sprintSlice';
import styles from './CorrectCombo.module.scss'


export const CorrectCombo = () => {
    const correct = useSelector(correctSeries);
    return (
    <div className={styles.correct__icons}>
          <span className={clsx(styles.correct__icon, 
            correct %4 !== 0 ? styles.correct__icon_filled : null)}>1</span>
          <span className={clsx(styles.correct__icon, 
            correct %4 !== 0 && correct %4 !== 1 ? styles.correct__icon_filled : null)}>2</span>
          <span className={clsx(styles.correct__icon, 
            correct %4 === 3 ? styles.correct__icon_filled : null)}>3</span>
        </div>
)}