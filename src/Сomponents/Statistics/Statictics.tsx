import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IGamesStatistics } from "../../models/common.models";
import { StatisticsService } from "../../services/statistics.service";
import { DayStatistics } from "./components/DayStatistics/DayStatistics";
import { LongStatistics } from "./components/LongStatistics/LongStatistics";
import styles from './Statistics.module.scss';
import { authIsAuthorized } from "../../store/reducers/authorizationSlice";
import Auth from "../Auth/Auth";

export const Statistics: React.FC<{ service: StatisticsService }> = ({ service }) => {
  const [gameStatistics, setGameStatistics] = useState<{ [k: string]: IGamesStatistics; } | null>();
  const isAuth = useSelector(authIsAuthorized)

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

  if(!isAuth)
    return <Auth/>

  return (
      <div className={styles.statistics}>
        <DayStatistics statistics={gameStatistics} />
        <LongStatistics />
      </div>
    )
  };
