import React from "react";
import shortid from "shortid";
import { GameStatistic } from "./GameStatistic/GameStatistic";
import styles from './DayStatistics.module.scss';
import { IGamesStatistics } from "../../../../models/common.models";
import { getGameStatistics, getLearnedWords, getRightAnswersPercents } from "./dayStatistic.helpers";
import { Loading } from "../Loading/Loading";

export const DayStatistics: React.FC<{statistics: { [k: string]: IGamesStatistics; } | null | undefined}> = (
  { statistics }
  ) => (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>Статистика дня</h2>
        {statistics && (<div className={styles.header__statistics}>
          <div className={styles.header__item}>
            <p className={styles.header__item__description}>
              Изученные слова (шт)
            </p>
            <strong className={styles.header__item__value}>{getLearnedWords(statistics)}</strong>
          </div>
          <div className={styles.header__item}>
            <p className={styles.header__item__description}>
              Правильные ответы (%)
            </p>
            <strong className={styles.header__item__value}>{getRightAnswersPercents(statistics)}</strong>
          </div>
        </div>)}
      </header>
      {
        !statistics
        ? <div className={styles.loading}><Loading /></div>
        : (
          <div className={styles.main}>
            <div className={styles.gamesStatistics}>
              {getGameStatistics(statistics).map((item) => (
                <div key={shortid()} className={styles.gamesStatistics__game}>
                  <GameStatistic {...item} />
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
