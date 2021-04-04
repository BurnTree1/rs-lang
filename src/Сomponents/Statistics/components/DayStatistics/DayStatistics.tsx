import React from "react";
import shortid from "shortid";
import { IGameStatistic } from "./dayStatistic.model";
import item1 from '../../../../assets/image/game-item1.svg'
import item2 from '../../../../assets/image/game-item2.svg'
import item3 from '../../../../assets/image/game-item3.svg'
import item4 from '../../../../assets/image/game-item4.svg'
import { GameStatistic } from "./GameStatistic/GameStatistic";
import styles from './DayStatistics.module.scss';

export const DayStatistics = () => {
  const gameStatisticsList: IGameStatistic[] = [
    {
      title: 'Саванна',
      logo: item1,
      learnedWords: 1000,
      rightAttempts: 1000,
      longestLine: 1000,
    },
    {
      title: 'Спринт',
      logo: item2,
      learnedWords: 1000,
      rightAttempts: 1000,
      longestLine: 1000,
    },
    {
      title: 'Аудиовызов',
      logo: item3,
      learnedWords: 1000,
      rightAttempts: 1000,
      longestLine: 1000,
    },
    {
      title: 'Memory Game',
      logo: item4,
      learnedWords: 1000,
      rightAttempts: 1000,
      longestLine: 1000,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>Статистика дня</h2>
        <div className={styles.header__statistics}>
          <div className={styles.header__item}>
            <p className={styles.header__item__description}>
              Изученные слова (шт)
            </p>
            <strong className={styles.header__item__value}>1000</strong>
          </div>
          <div className={styles.header__item}>
            <p className={styles.header__item__description}>
              Правильные ответы (%)
            </p>
            <strong className={styles.header__item__value}>1000</strong>
          </div>
        </div>
      </header>
      <div className={styles.main}>
        <div className={styles.gamesStatistics}>
          {gameStatisticsList.map((item) => (
            <div key={shortid()} className={styles.gamesStatistics__game}>
              <GameStatistic {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
