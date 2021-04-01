import React from "react";
import { Route, Switch } from "react-router-dom";
import { bookBuilder, urlParams } from "../../helpers";
import Page from "./Page/Page";
import Book from "./Book"

export default () => (
    <Switch>
        <Route exact path={bookBuilder(urlParams.section, urlParams.page)}>
            <Page/>
        </Route>
        <Route exact path={bookBuilder(urlParams.section)}>
            <Page/>
        </Route>
        <Route exact path={bookBuilder()}>
            <Book/>
        </Route>
    </Switch>
)
