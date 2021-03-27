import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { AppWrapper } from "./Components/AppWrapper/AppWrapper";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { Book } from "./Components/Book/Book";
import { Dictionary } from "./Components/Dictionary/Dictionary";
import { Statistics } from "./Components/Statistics/Statictics";
import { Settings } from "./Components/Settings/Settings";
import { Savannah } from "./Components/Games/Savannah/Savannah";
import { AudioContainer } from "./Components/Games/Audio/AudioContainer/AudioContainer";
import { SprintContainer } from "./Components/Games/Sprint/SprintContainer/SprintContainer";
import { MyGame } from "./Components/Games/MyGame/MyGame";
import { Studied } from "./Components/Dictionary/Studied/Studied";
import { Difficult } from "./Components/Dictionary/Difficult/Difficult";
import { Deleted } from "./Components/Dictionary/Deleted/Deleted";

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
