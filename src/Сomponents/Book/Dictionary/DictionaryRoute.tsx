import React from "react";
import { Route, Switch } from "react-router-dom";
import { Studied } from "./Studied/Studied";
import { Difficult } from "./Difficult/Difficult";
import { Deleted } from "./Deleted/Deleted";
import { urlBuilder, urlParams, urlPrefix } from "../../../helpers";

export default () => (
  <Switch>
    <Route exact path={urlBuilder(urlPrefix.studied, urlParams.section, urlParams.page)}>
      <Studied/>
    </Route>
    <Route exact path={urlBuilder(urlPrefix.studied, urlParams.section)}>
      <Studied/>
    </Route>
    <Route exact path={urlBuilder(urlPrefix.difficult, urlParams.section, urlParams.page)}>
      <Difficult/>
    </Route>
    <Route exact path={urlBuilder(urlPrefix.difficult, urlParams.section)}>
      <Difficult/>
    </Route>
    <Route exact path={urlBuilder(urlPrefix.deleted, urlParams.section, urlParams.page)}>
      <Deleted/>
    </Route>
    <Route exact path={urlBuilder(urlPrefix.deleted, urlParams.section)}>
      <Deleted/>
    </Route>
  </Switch>
)
