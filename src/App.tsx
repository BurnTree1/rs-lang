import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { AppWrapper } from './Сomponents/AppWrapper/AppWrapper';
import { LandingPage } from './Сomponents/LandingPage/LandingPage';
import { Book } from './Сomponents/Book/Book';
import { Dictionary } from './Сomponents/Dictionary/Dictionary';
import { Statistics } from './Сomponents/Statistics/Statictics';
import { Settings } from './Сomponents/Settings/Settings';
import Savannah from './Сomponents/Savannah/Savannah';
import { Sprint } from './Сomponents/Sprint/Sprint';
import { MyGame } from './Сomponents/MyGame/MyGame';
import { Audio } from './Сomponents/Audio/Audio';

export function App() {
  return (
    <div className="app">
      <AppWrapper>
        <Switch>
          <Route path="/book">
            <Book />
          </Route>

          <Route path="/dictionary">
            <Dictionary />
          </Route>

          <Route path="/statistics">
            <Statistics />
          </Route>

          <Route path="/settings">
            <Settings />
          </Route>

          <Route path="/savannah">
            <Savannah />
          </Route>

          <Route path="/audio">
            <Audio />
          </Route>

          <Route path="/sprint">
            <Sprint />
          </Route>

          <Route path="/my-game">
            <MyGame />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route>
            <div>404 Not Found</div>
          </Route>
        </Switch>
      </AppWrapper>
    </div>
  );
}

// export App;
