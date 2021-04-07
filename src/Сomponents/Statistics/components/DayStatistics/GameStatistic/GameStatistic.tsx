import React from "react";
import { IGameStatistic } from "../dayStatistic.model";
import styles from './GameStatistic.module.scss';

export const GameStatistic: React.FC<IGameStatistic> = ({ title, logo, learnedWords, rightAttempts, longestLine }) => (
  <section className={styles.card}>
    <div className={styles.cardLogoWrapper}>
      <img className={styles.cardLogo} src={logo} alt="logo"/>
    </div>
    <h3 className={styles.cardTitle}>{title}</h3>
    <ul className={styles.cardList}>
      <li className={styles.cardItem}>
        <p className={styles.cardItem__description}>
          Изученные слова (шт)
        </p>
        <strong className={styles.cardItem__value}>{learnedWords}</strong>
      </li>
      <li className={styles.cardItem}>
        <p className={styles.cardItem__description}>
          Правильные ответы (%)
        </p>
        <strong className={styles.cardItem__value}>{rightAttempts}</strong>
      </li>
      <li className={styles.cardItem}>
        <p className={styles.cardItem__description}>
          Длинная серия (шт)
        </p>
        <strong className={styles.cardItem__value}>{longestLine}</strong>
      </li>
    </ul>
  </section>
);
