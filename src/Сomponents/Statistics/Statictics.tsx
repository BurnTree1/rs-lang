import React, { useEffect } from "react";
import { userStatistics } from "../../api/statistics";
import { DayStatistics } from "./components/DayStatistics/DayStatistics";
import { LongStatistics } from "./components/LongStatistics/LongStatistics";
import styles from './Statistics.module.scss';

export const Statistics = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const statistics = await userStatistics.get();
        console.log(statistics);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  });

  const addStatistics = () => {
    userStatistics.put();
  };
  return (
      <div className={styles.statistics}>
        <button type="button" onClick={addStatistics}>Submit</button>
        <DayStatistics />
        <LongStatistics />
      </div>
    )
  };
