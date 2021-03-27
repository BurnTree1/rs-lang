import React from "react";
import { Route, Switch } from "react-router-dom";
import { bookBuilder } from "../../helpers";
import Page from "./Page/Page";
import Book from "./Book"

export default () => (
    <Switch>
        <Route exact path={bookBuilder(':sectionId', ':pageId')}>
            <Page/>
        </Route>
        <Route exact path={bookBuilder(':sectionId', null)}>
            <Page/>
        </Route>
        <Route exact path={bookBuilder(null, null)}>
            <Book/>
        </Route>
    </Switch>
)
