import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { AppWrapper } from "./Components/AppWrapper/AppWrapper";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { Book } from "./Components/Book/Book";
import { Dictionary } from "./Components/Dictionary/Dictionary";
import { Statistics } from "./Components/Statistics/Statictics";
import { Settings } from "./Components/Settings/Settings";
import { Savannah } from "./Components/Savannah/Savannah";
import { Audio } from "./Components/Audio/Audio";
import { Sprint } from "./Components/Sprint/Sprint";
import { MyGame } from "./Components/MyGame/MyGame";

function App() {
  return (
    <div className="app">
      <AppWrapper>
      <Switch>
        <Route path="/book">
            <Book/>
        </Route>

        <Route path="/dictionary">
            <Dictionary/>
        </Route>

        <Route path="/statistics">
            <Statistics/>
        </Route>

        <Route path="/settings">
            <Settings/>
        </Route>

        <Route path="/savannah">
            <Savannah/>
        </Route>

        <Route path="/audio">
            <Audio/>
        </Route>

        <Route path="/sprint">
            <Sprint/>
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
