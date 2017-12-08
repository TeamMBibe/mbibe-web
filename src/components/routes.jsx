import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from "../App"
import LoginPage from "../pages/accounts/LoginPage"


const routes = (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/Login" component={LoginPage} />
        </Switch>
    </BrowserRouter>
);

export default routes;