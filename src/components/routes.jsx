import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MasterHomePage from "../pages/MasterHomePage"
import MasterProfilePage from "../pages/MasterProfilePage"
import GenericNotFound from "./util/GenericNotFound"


const routes = (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MasterHomePage} />
            <Route path="/login" component={MasterHomePage} />
            <Route path="/create-account" component={MasterHomePage} />
            <Route path="/profile/:member" component={MasterProfilePage} />
            <Route path="*" component={GenericNotFound} />
        </Switch>
    </BrowserRouter>
);

export default routes;
