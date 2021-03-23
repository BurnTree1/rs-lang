import React from "react";
import styles from './Start.module.scss'

export const Start = () => (
    <div className={styles.start}>
      <h2 className={styles.title}>Начать изучение</h2>
      <div className={styles.start__btns}>
        <button type='button' className={styles.enter}>Войти</button>
        <button type='button' className={styles.registration}>Зарегистрирвоаться</button>
      </div>
    </div>
  )