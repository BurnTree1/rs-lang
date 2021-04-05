import React, { useEffect, useState } from "react";
import { IGamesStatistics } from "../../models/common.models";
import { StatisticsService } from "../../services/statistics.service";
import { DayStatistics } from "./components/DayStatistics/DayStatistics";
import { LongStatistics } from "./components/LongStatistics/LongStatistics";
import styles from './Statistics.module.scss';

export const Statistics: React.FC<{ service: StatisticsService }> = ({ service }) => {
  const [gameStatistics, setGameStatistics] = useState<{ [k: string]: IGamesStatistics; } | null>();

  useEffect(() => {
    const getData = async () => {
      try {
        const statistics = await service.getGameStatistics();
        setGameStatistics(statistics);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [service]);

  return (
      <div className={styles.statistics}>
        {gameStatistics && <DayStatistics statistics={gameStatistics} />}
        <LongStatistics />
      </div>
    )
  };
