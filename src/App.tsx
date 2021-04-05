import React, { useEffect } from 'react';
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AppWrapper } from "./Сomponents/AppWrapper/AppWrapper";
import { LandingPage } from "./Сomponents/LandingPage/LandingPage";
import { Statistics } from "./Сomponents/Statistics/Statictics";
import { Settings } from "./Сomponents/Settings/Settings";
import Savannah from "./Сomponents/Savannah/Savannah";
import { AudioContainer } from "./Сomponents/Games/Audio/AudioContainer/AudioContainer";
import { SprintContainer } from "./Сomponents/Games/Sprint/SprintContainer/SprintContainer";
import { MyGame } from "./Сomponents/Games/MyGame/MyGame";
import BookRoute from "./Сomponents/Book/BookRoute";
import DictionaryRoute from "./Сomponents/Book/Dictionary/DictionaryRoute";
import { getUserData } from './store/reducers/authorizationSlice';
import { PAGE_AUTH } from "./helpers";
import Auth from "./Сomponents/Auth/Auth";
import { StatisticsService } from './services/statistics.service';

export function App() {
  const dispatch = useDispatch()
  const statisticsService = new StatisticsService();

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])
  return (
    <div className="app">
      <AppWrapper>
        <Switch>
          <Route path="/book" component={BookRoute}/>

          <Route path="/dictionary" component={DictionaryRoute}/>

          <Route path="/statistics">
            <Statistics service={statisticsService} />
          </Route>

          <Route path="/settings">
            <Settings/>
          </Route>

          <Route path="/savannah">
            <Savannah/>
          </Route>

          <Route path="/audio">
            <AudioContainer/>
          </Route>

          <Route path="/sprint">
            <SprintContainer/>
          </Route>

          <Route path="/my-game">
            <MyGame/>
          </Route>

          <Route path={PAGE_AUTH} component={Auth}/>

          <Route exact path="/">
            <LandingPage/>
          </Route>

          <Route>
            <div>404 Not Found</div>
          </Route>
        </Switch>
      </AppWrapper>
    </div>
  );
}
