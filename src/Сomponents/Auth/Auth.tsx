import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { authIsAuthorized, authIsSignInSuccessfully } from '../../store/reducers/authorizationSlice';
import { Footer } from '../Footer/Footer';
import { Intro } from '../LandingPage/Intro/Intro';
import LoginForm from '../LandingPage/Modals/LoginForm';
import RegistrationForm from '../LandingPage/Modals/RegistrationFrom';
import styles from './Auth.module.scss';

const Auth = () => {
  const history = useHistory();
  const [modalControls, setModalControls] = useState({
    signUp: false,
    signIn: false,
  });
  const [overlay, setOverlay] = useState(false);
  const isAuthIsAuthorized = useSelector(authIsAuthorized);
  const isSignInSuccessfully = useSelector(authIsSignInSuccessfully);

  const onOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setOverlay(true);
    setModalControls((prevModalControls) => ({
      ...prevModalControls,
      [target.name]: true,
    }));
  };

  const onCloseModal = () => {
    setOverlay(false);
    setModalControls({
      signUp: false,
      signIn: false,
    });
  };

  useEffect(() => {
    if (isAuthIsAuthorized) {
      history.push('/book');
      setOverlay(false);
      setModalControls({
        signUp: false,
        signIn: false,
      });
    }
  }, [isAuthIsAuthorized, isSignInSuccessfully]);
  return (
    <>
      <Intro onOpenModal={onOpenModal} />
      <Footer/>
      <RegistrationForm open={modalControls.signUp} />
      <LoginForm open={modalControls.signIn} isSignInSuccessfully={isSignInSuccessfully}/>
      {overlay? <div className={styles.overlay} onClick={onCloseModal} /> : null}
    </>
  );
};

export default Auth;
