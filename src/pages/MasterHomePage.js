import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import MediaQuery from 'react-responsive';
import { withRouter, Redirect } from 'react-router'
import PropTypes from 'prop-types';
import App from "../App"
import LoginPage from "../pages/accounts/LoginPage"
import GenericNotFound from "../components/util/GenericNotFound"
import LoginFormComponent from '../components/accounts/LoginFormComponent'
import CreateAccountComponent from '../components/accounts/CreateAccountComponent'
import VerifyAccountComponent from '../components/accounts/VerifyAccountComponent'

const MasterHomePage = observer(class MasterHomePage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

    render() {
        return (
            <div>
                <Switch>
                  <Route exact path="/" render={routeProps => <App {...routeProps} />} />
                  <Route exact path="/login" render={routeProps => <LoginFormComponent {...routeProps} />} />
                  <Route exact path="/verify" render={routeProps => <VerifyAccountComponent {...routeProps} />} />
                  <Route exact path="/create-account" render={routeProps => <CreateAccountComponent {...routeProps} />} />

                </Switch>
            </div>
        );
    }
});


export default MasterHomePage;
