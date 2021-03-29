import React from "react";
import { Link, Route, Router, Switch, useHistory, useRouteMatch } from "react-router-dom";
import SettingsView from "../Views/SettingsView/SettingsView";
import { GameScreen } from "./components/GameScreen/GameScreen";
import MemoryGame from "./components/MemoryGame/MemoryGame";
import { Settings } from "./components/Settings/Settings";
import { StartScreen } from "./components/StartScreen/StartScreen";
import styles from './MyGame.module.scss';

export const MyGame = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const setSettings = () => {
    console.log('setSettings');
  };
  const setGameView = () => {
    console.log('setGameView');
    history.push(`${url}/game`);
  };
    return (
    // <Router>
      // <>
      //   <div>
      //     <ul>
      //       <li>
      //         <Link to={`${url}`}>Start screen</Link>
      //       </li>
      //       <li>
      //         <Link to={`${url}/settings`}>settings</Link>
      //       </li>
      //       <li>
      //         <Link to={`${url}/game`}>game</Link>
      //       </li>
      //     </ul>

      //     <hr />

      //     <Switch>
      //       <Route exact path={path}>
      //         <StartScreen />
      //       </Route>
      //       <Route path={`${path}/settings`}>
      //         <h3>Settings</h3>
      //       </Route>
      //       <Route path={`${path}/game`}>
      //         <h3>Game</h3>
      //       </Route>
      //     </Switch>
      //   </div>
      // </>
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
              <GameScreen />
            </Route>
          </Switch>
        </div>
  );
}
