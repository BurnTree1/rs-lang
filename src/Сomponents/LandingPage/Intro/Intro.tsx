import React from 'react';
import styles from "./Intro.module.scss";
import titleImg from "../../../assets/image/title.svg";

type Props = {
  onOpenModal: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Intro: React.FC<Props> = ({  onOpenModal }) => (
    <div className={styles.intro}>
      <div className={styles.title}>
        <h1 className={styles.title__text}>RSLang</h1>
        <img src={titleImg} alt="planet"/>
      </div>
      <div className={styles.intro__text}>инновационный подход к изучению английского языка</div>
      <div className={styles.intro__row}>
        <span className={styles.intro__possibility}>теория</span>
        <span className={styles.intro__possibility}>практика</span>
        <span className={styles.intro__possibility}>миниигры</span>
      </div>
      <div className={styles.intro__btns}>
        <button type='button' className={styles.enter} name="signIn" onClick={onOpenModal}>Войти</button>
        <button type='button' className={styles.registration} name="signUp" onClick={onOpenModal}>Зарегистрироваться</button>
      </div>
    </div>
  )

