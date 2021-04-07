import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { GameLayer } from "../../GameLayer/GameLayer";
import { setHasDifficulty } from '../../../../store/reducers/sprintSlice';
import { Audio } from '../Audio'
import styles from './AudioContainer.module.scss'
import icon from '../../../../assets/image/audioicon.svg'

export const AudioContainer = () => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const submitGameOver = () => {
    setIsGameStarted(false)
    dispatch(setHasDifficulty())
  }
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(setHasDifficulty()) 
   },[])
  return (
    <div className={styles.audio__wrapper}>
    <GameLayer difficultType='количество попыток прослушать слово' isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted}>
      <img src={icon} alt="icon" className={styles.audio__icon} />
        <div className={styles.title}>АУДИОВЫЗОВ</div>
        <div className={styles.text}>
          Тренировка Аудиовизов развивает перевод на слух. Чем правильнее ты отвечаешь, тем больше бонуса получаешь.
        </div>
      </GameLayer>
      {isGameStarted && <Audio submitGameOver={submitGameOver} />}
  </div>
)}