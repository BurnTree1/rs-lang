import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from "./Intro.module.scss";
import titleImg from "../../../assets/image/title.svg";
import RegistrationForm from '../Modals/RegistrationFrom';
import LoginForm from '../Modals/LoginForm';
import { authIsSignInSuccessfully } from '../../../store/reducers/authorizationSlice';

export const  Intro = () => {
  const [modalControls, setModalControls] = useState({
    signUp: false,
    signIn: false
  });
  const [overlay, setOverlay] = useState(false);
  const isSignInSuccessfully = useSelector(authIsSignInSuccessfully)

  const onOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setOverlay(true)
    setModalControls((prevModalControls) => ({
      ...prevModalControls,
        [target.name]: true
    }))
  }

  const onCloseModal = () => {
    setOverlay(false);
    setModalControls({
      signUp: false,
      signIn: false
    })
  }

  useEffect(() => {
    if (isSignInSuccessfully) {
      setOverlay(false);
      setModalControls({
        signUp: false,
        signIn: false
      })
    }
  }, [isSignInSuccessfully])

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
      <div className={styles.intro__btns}>
        <button type='button' className={styles.enter} name="signIn" onClick={onOpenModal}>Войти</button>
        <button type='button' className={styles.registration} name="signUp" onClick={onOpenModal}>Зарегистрироваться</button>
      </div>
      <RegistrationForm open={modalControls.signUp} />
      <LoginForm open={modalControls.signIn} isSignInSuccessfully={isSignInSuccessfully}/>
      <div className={styles.overlay} onClick={onCloseModal} style={{
        display: overlay ? "block" : "none"
      }}/>
    </div>
  )
}

