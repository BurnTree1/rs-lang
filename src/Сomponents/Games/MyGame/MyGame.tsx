import React, { useState } from "react";
import { Link, Route, Router, Switch, useHistory, useRouteMatch } from "react-router-dom";
import SettingsView from "../../Views/SettingsView/SettingsView";
import { GameScreen } from "./components/GameScreen/GameScreen";
import MemoryGame from "./components/MemoryGame/MemoryGame";
import { Settings } from "./components/Settings/Settings";
import { StartScreen } from "./components/StartScreen/StartScreen";
import { IGameSettings } from "./my-game.models";
import styles from './MyGame.module.scss';
// ['Начальный', 'Легкий', 'Средний', 'Сложный', 'Великий', 'Невероятный']

const defaultSettings: IGameSettings = {
  section: 'Начальный',
  difficult: '7000',
};

export const MyGame = () => {
  const [settings, setSettingsState] = useState<IGameSettings>(defaultSettings);
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const setSettings = (value: IGameSettings) => {
    console.log('setSettings', settings);
    setSettingsState(value);
  };

  const setGameView = () => {
    history.push(`${url}/game`);
  };
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
          <GameScreen settings={settings} />
        </Route>
      </Switch>
    </div>
  );
}
