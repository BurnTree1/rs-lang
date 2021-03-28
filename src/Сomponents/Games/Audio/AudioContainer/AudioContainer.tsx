import React, { useState } from "react";
import { GameLayer } from "../../GameLayer/GameLayer";
import { Audio } from '../Audio'
import styles from './AudioContainer.module.scss'
import icon from '../../../../assets/image/audioicon.svg'

export const AudioContainer = () => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  return (
    <div className={styles.audio__wrapper}>
    <GameLayer setIsGameStarted={setIsGameStarted}>
      <img src={icon} alt="icon" className={styles.audio__icon} />
        <div className={styles.title}>АУДИОВЫЗОВ</div>
        <div className={styles.text}>
          Тренировка Аудиовизов развивает перевод на слух. Чем правильнее ты отвечаешь, тем больше бонуса получаешь.
        </div>
      </GameLayer>
      {isGameStarted && <Audio />}
  </div>
)}