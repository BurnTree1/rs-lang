import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { AppWrapper } from './components/AppWrapper/AppWrapper';
import { LandingPage } from './components/LandingPage/LandingPage';
import { Book } from './components/Book/Book';
import { Dictionary } from './components/Dictionary/Dictionary';
import { Statistics } from './components/Statistics/Statictics';
import { Settings } from './components/Settings/Settings';
import Savannah from './components/Savannah/Savannah';
import { Audio } from './components/Audio/Audio';
import { Sprint } from './components/Sprint/Sprint';
import { MyGame } from './components/MyGame/MyGame';

function App() {
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

export default App;
