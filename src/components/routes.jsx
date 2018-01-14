import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from "../App"
import LoginPage from "../pages/accounts/LoginPage"
import AvailableAreasGrid from "./services/AvailableAreasGrid"


const routes = (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/Login" component={LoginPage} />
            <Route exact path="/Areas" component={AvailableAreasGrid} />
        </Switch>
    </BrowserRouter>
);

export default routes;
