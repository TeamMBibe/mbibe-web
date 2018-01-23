import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import MediaQuery from 'react-responsive';
import { withRouter, Redirect } from 'react-router'
import PropTypes from 'prop-types';
import App from "../App"
import LoginPage from "../pages/accounts/LoginPage"
import GenericNotFound from "../components/util/GenericNotFound"

const MasterHomePage = observer(class MasterHomePage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

    render() {
        return (
            <div>
                <Switch>
                  <Route exact path="/" render={routeProps => <App {...routeProps} />} />
                  <Route exact path="/login" render={routeProps => <LoginPage {...routeProps} registrationStage="SIGNIN" />} />
                  <Route path="/create-account" render={routeProps => <LoginPage {...routeProps} registrationStage="CREATEACCOUNT" />} />
                </Switch>
            </div>
        );
    }
});


export default MasterHomePage;
