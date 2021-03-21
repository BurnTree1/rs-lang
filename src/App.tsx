import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { MainPage } from "./Components/MainPage/MainPage";
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
      <Switch>
        <Route path="/book">
          <MainPage>
            <Book/>
          </MainPage>
        </Route>
        <Route path="/dictionary">
          <MainPage>
            <Dictionary/>
          </MainPage>
        </Route>
        <Route path="/statistics">
          <MainPage>
            <Statistics/>
          </MainPage>
        </Route>
        <Route path="/settings">
          <MainPage>
            <Settings/>
          </MainPage>
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
          <MainPage>
            <LandingPage/>
          </MainPage>
        </Route>
        <Route>
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
