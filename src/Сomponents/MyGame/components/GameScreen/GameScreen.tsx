import React, { useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import GetReadyView from "../../../Views/GetReadyView/GetReadyView";
import MemoryGame from "../MemoryGame/MemoryGame";
import styles from './GameScreen.module.scss';

export const GameScreen = () => {
  // load game
  // while loading - show spinner
  const [showLoading, setLoading] = useState<boolean>(true);
  
  const [query, setQuery] = useState('group=1&page=1');
  const url = query && `${process.env.REACT_APP_BACKEND}/words?query=${query}`;
  // const url = query && `https://rs-lang2021.herokuapp.com/words?query=${query}`;
  const { status, data } = useFetch(url);
  console.log(status);
  console.log(data);

  const setGameStatus = () => {
    console.log('setGameStatus');

    if (status !== 'fetching') {
      setLoading(false);
    }
      // (false);
  };

  if (showLoading) {
    return (
      <div style={{ position: 'relative' }}>
        <div className={styles.spinnerWrapper}>
          <GetReadyView setGameStatus={setGameStatus} />
        </div>
        <div className={styles.spinnerOverlay} />
      </div>
    );
  }
  return (
    <MemoryGame words={data.slice(0, 12)} />
  );
}