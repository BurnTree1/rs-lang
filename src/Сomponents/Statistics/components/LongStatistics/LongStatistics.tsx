import React, { useEffect, useState } from "react";
import get from "lodash/get";
import styles from "./LongStatistics.module.scss";
import { Chart } from "./Chart/Chart";
import { userAggregateWords } from "../../../../api";
import { WordType } from "../../../../types";

export const LongStatistics = () => {

  const [dateMap, setDateMap] = useState({});
  const [growthMap, setGrowthMap] = useState({});

  useEffect(() => {
    userAggregateWords.getForStatistic()
      .then(({ data }) => {
        const dateWords = {};
        data.forEach((el: WordType) => {
          const date = get(el, ["userWord", "optional", "date"]);
          // @ts-ignore
          dateWords[date] = (dateWords[date] || 0) + 1;
        });

        const sortedDateMap = Object.keys(dateWords).sort().reduce(
          (obj, key) => {
            // @ts-ignore
            obj[key] = dateWords[key];
            return obj;
          }, {}
        );
        setDateMap(sortedDateMap);

        let count = 0;
        const growth = {};
        Object.keys(sortedDateMap).forEach((key) => {
          // @ts-ignore
          count += sortedDateMap[key];
          // @ts-ignore
          growth[key] = count;
        });
        setGrowthMap(growth);
      });
  }, []);

  return <div className={styles.wrapper}>
    <header className={styles.header}>
      <h2 className={styles.title}>Статистика за все время</h2>
    </header>
    <div className={styles.main}>
      <div className={styles.charts}>
        <div className={styles.chart}>
          <h4 className={styles.chart__title}>Изученные слова</h4>
          <Chart dateMap={dateMap}/>
        </div>
        <div className={styles.chart}>
          <h4 className={styles.chart__title}>Прирост изученных слов</h4>
          <Chart dateMap={growthMap}/>
        </div>
      </div>
    </div>
  </div>;
};
