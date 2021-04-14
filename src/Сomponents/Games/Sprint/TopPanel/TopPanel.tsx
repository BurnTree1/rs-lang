import React, { FC, useState } from 'react';
import fullscreen from '../../../../assets/image/fullscreen.svg';
import close from '../../../../assets/image/close.svg';
import styles from './TopPanel.module.scss';

type PropsType = {
  setGameIsPaused: (value: boolean) => void;
};
export const TopPanel: FC<PropsType> = ({ setGameIsPaused }) => {
  const [isFull, setIsFull] = useState<boolean>(false);
  const onFullscreen = () => {
    const doc = document.documentElement as HTMLElement & {
      webkitRequestFullscreen(): Promise<void>;
      webkitCancelFullScreen(): Promise<void>;
    };
    if (doc.webkitRequestFullscreen && !isFull) {
      doc.webkitRequestFullscreen();
      setIsFull(true);
    }
    // @ts-ignore
    if (document.webkitCancelFullScreen && isFull) {
      // @ts-ignore
      document.webkitCancelFullScreen();
      setIsFull(false);
    }
  };
  const onGameClose = () => {
    setGameIsPaused(true);
  };
  return (
    <div className={styles.panel}>
      <button onClick={onFullscreen} type="button" className={styles.fullscreen__btn}>
        <img src={fullscreen} alt="fullscreen" className={styles.fullscreen} />
      </button>
      <button onClick={onGameClose} type="button" className={styles.close__btn}>
        <img src={close} alt="close" className={styles.close__img} />
      </button>
    </div>
  );
};
