import React from "react";
import styles from './LongStatistics.module.scss';
import { Chart } from "./Chart/Chart";

export const LongStatistics = () => (
  <div className={styles.wrapper}>
    <header className={styles.header}>
      <h2 className={styles.title}>Статистика за все время</h2>
    </header>
    <div className={styles.main}>
      <div className={styles.charts}>
        <div className={styles.chart}>
          <h4 className={styles.chart__title}>Изученные слова</h4>
          <Chart />
        </div>
        <div className={styles.chart}>
          <h4 className={styles.chart__title}>Прирост изученных слов</h4>
          <Chart />
        </div>
      </div>
    </div>
  </div>
);
