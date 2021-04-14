import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import titleImg from "../../../assets/image/title.svg";
import { authIsAuthorized } from '../../../store/reducers/authorizationSlice';
import styles from "./Intro.module.scss";

type Props = {
  onOpenModal: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Intro: React.FC<Props> = ({  onOpenModal }) => {
  const isAuthIsAuthorized = useSelector(authIsAuthorized);
  const history = useHistory();
  const onStartLearning = () => {
    history.push('/book');
  };

  return (
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
      {isAuthIsAuthorized
        ? (
          <div className={styles.intro__btns}>
            <button type='button' className={styles.enter} name="signIn" onClick={onStartLearning}>Начать обучение</button>
          </div>
        )
        : (
            <div className={styles.intro__btns}>
              <button type='button' className={styles.enter} name="signIn" onClick={onOpenModal}>Войти</button>
              <button type='button' className={styles.registration} name="signUp" onClick={onOpenModal}>Зарегистрироваться</button>
            </div>
          )
      }
    </div>
  );
}

