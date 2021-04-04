import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { IWord } from "../../../../../models/common.models";
import { clearWords } from "../../../../../store/reducers/memoryGameSlice";
import GetReadyView from "../../../../Views/GetReadyView/GetReadyView";
import { IGameSettings } from "../../my-game.models";
import MemoryGame from "../MemoryGame/MemoryGame";
import styles from './GameScreen.module.scss';

export const GameScreen: React.FC<{ settings: IGameSettings, words: IWord[] }> = ({ settings, words }) => {
  const [showLoading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!words || words.length === 0) {
    dispatch(clearWords());
    history.push('/my-game');
  }

  const setGameStatus = () => {
    setLoading(false);
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
    <MemoryGame delay={Number(settings.difficult)} words={words.slice(0, 2)} />
  );
}