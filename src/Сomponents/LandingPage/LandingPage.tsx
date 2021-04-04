import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Intro } from "./Intro/Intro";
import { Benefits } from "./Benefits/Benefits";
import { Team } from "./Team/Team";
import { Start } from "./Start/Start";
import { Footer } from "../Footer/Footer";
import { authIsSignInSuccessfully } from '../../store/reducers/authorizationSlice';
import styles from './Intro/Intro.module.scss';
import RegistrationForm from './Modals/RegistrationFrom';
import LoginForm from './Modals/LoginForm';

export const LandingPage = () => {
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
        if (!isSignInSuccessfully) {
            setOverlay(false);
            setModalControls({
                signUp: false,
                signIn: false
            })
        }
    }, [isSignInSuccessfully])

    return (
          <div>
              <Intro
                onOpenModal={onOpenModal}
              />
              <Benefits/>
              <Team/>
              <Start
                onOpenModal={onOpenModal}
              />
              <Footer/>
              <RegistrationForm open={modalControls.signUp} />
              <LoginForm open={modalControls.signIn} isSignInSuccessfully={isSignInSuccessfully}/>
              <div className={styles.overlay} onClick={onCloseModal} />
          </div>
      )

};
