import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MasterHomePage from "../pages/MasterHomePage"
import MasterProfilePage from "../pages/MasterProfilePage"
import MasterPlacePage from "../pages/MasterPlacePage"
import GenericNotFound from "./util/GenericNotFound"


const routes = (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MasterHomePage} />
            <Route path="/login" component={MasterHomePage} />
            <Route path="/create-account" component={MasterHomePage} />
            <Route path="/verify" component={MasterHomePage} />
            <Route path="/profile" component={MasterProfilePage} />
            <Route path="/place/:location" component={MasterPlacePage} />
            <Route path="*" component={GenericNotFound} />
        </Switch>
    </BrowserRouter>
);

export default routes;
