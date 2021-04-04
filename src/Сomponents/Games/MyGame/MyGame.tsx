import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { IWord } from "../../../models/common.models";
import { loading, wordsArr } from "../../../store/reducers/memoryGameSlice";
import { GameScreen } from "./components/GameScreen/GameScreen";
import { Preloading } from "./components/Preloading/Preloading";
import { Settings } from "./components/Settings/Settings";
import { StartScreen } from "./components/StartScreen/StartScreen";
import { IGameSettings } from "./my-game.models";
import styles from './MyGame.module.scss';
 
const defaultSettings: IGameSettings = {
  section: 'Начальный',
  difficult: '7000',
};

export const MyGame = () => {
  const [settings, setSettingsState] = useState<IGameSettings>(defaultSettings);
  const allWords: IWord[] = useSelector(wordsArr);
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const setSettings = (value: IGameSettings) => {
    setSettingsState(value);
  };

  const setGameView = () => {
    history.push(`${url}/game`);
  };

  const gameLoading = useSelector(loading);
  return (
    <div className={styles.startScreen}>
      <Switch>
        <Route exact path={path}>
          <StartScreen />
        </Route>
        <Route path={`${path}/settings`}>
          <Settings
            setSettings={setSettings}
            setGameView={setGameView}
          />
        </Route>
        <Route path={`${path}/game`}>
          {gameLoading ? <Preloading /> : <GameScreen settings={settings} words={allWords}/>}
        </Route>
      </Switch>
    </div>
  );
}
