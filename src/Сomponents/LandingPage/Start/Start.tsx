import React from "react";
import styles from './Start.module.scss'

type Props = {
  onOpenModal: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Start: React.FC<Props> = ({  onOpenModal }) => (
      <div className={styles.start}>
        <h2 className={styles.title}>Начать изучение</h2>
        <div className={styles.start__btns}>
          <button type='button' className={styles.enter} name="signIn" onClick={onOpenModal}>Войти</button>
          <button type='button' className={styles.registration} name="signUp" onClick={onOpenModal}>Зарегистрироваться</button>
        </div>
      </div>
    )

