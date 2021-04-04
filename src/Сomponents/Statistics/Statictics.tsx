import React from "react";
import { DayStatistics } from "./components/DayStatistics/DayStatistics";
import { LongStatistics } from "./components/LongStatistics/LongStatistics";
import styles from './Statistics.module.scss';

export const Statistics = () => (
  <div className={styles.statistics}>
    <DayStatistics />
    <LongStatistics />
  </div>
);
