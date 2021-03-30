import React from "react";
import { Route, Switch } from "react-router-dom";
import { Studied } from "./Studied/Studied";
import { Difficult } from "./Difficult/Difficult";
import { Deleted } from "./Deleted/Deleted";

export default () => (
  <Switch>
    <Route exact path="/dictionary/studied">
      <Studied/>
    </Route>
    <Route exact path="/dictionary/difficult">
      <Difficult/>
    </Route>
    <Route exact path="/dictionary/deleted">
      <Deleted/>
    </Route>
  </Switch>
)
