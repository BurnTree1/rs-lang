import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { AppWrapper } from "./Сomponents/AppWrapper/AppWrapper";
import { LandingPage } from "./Сomponents/LandingPage/LandingPage";
import { Dictionary } from "./Сomponents/Dictionary/Dictionary";
import { Statistics } from "./Сomponents/Statistics/Statictics";
import { Settings } from "./Сomponents/Settings/Settings";
import Savannah from "./Сomponents/Savannah/Savannah";
import { AudioContainer } from "./Сomponents/Games/Audio/AudioContainer/AudioContainer";
import { SprintContainer } from "./Сomponents/Games/Sprint/SprintContainer/SprintContainer";
import { MyGame } from "./Сomponents/Games/MyGame/MyGame";
import { Studied } from "./Сomponents/Dictionary/Studied/Studied";
import { Difficult } from "./Сomponents/Dictionary/Difficult/Difficult";
import { Deleted } from "./Сomponents/Dictionary/Deleted/Deleted";
import BookRoute from "./Сomponents/Book/BookRoute";

function App() {
  return (
    <div className="app">
      <AppWrapper>
      <Switch>
        <Route path="/book" component={BookRoute} />

          <Route path="/dictionary">
            <Dictionary />
          </Route>

          <Route path="/statistics">
            <Statistics />
          </Route>
        <Route path="/studied">
            <Studied/>
        </Route>

        <Route path="/difficult">
            <Difficult/>
        </Route>

        <Route path="/deleted">
            <Deleted/>
        </Route>

        <Route path="/statistics">
            <Statistics/>
        </Route>

          <Route path="/settings">
            <Settings />
          </Route>

          <Route path="/savannah">
            <Savannah />
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

export default App;
