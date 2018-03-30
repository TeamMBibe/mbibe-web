import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import headerStore from '../../data_stores/HeaderStore'
import userStore from '../../data_stores/UserStore'
import accountManagement from '../management/AccountManagement'
import LoginComponent from './LoginComponent'
import VerifyAccountComponent from './VerifyAccountComponent'
import CreateAccountComponent from './CreateAccountComponent'
import GenericNotFound from '../util/GenericNotFound'

const AccountComponent = observer(class AccountComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
      //this.authenticateUser()
      console.log('userStore', userStore.businessObject)
    }

    async authenticateUser() {
      try {
        let valid = await accountManagement.isLoggedIn()
        const member = this.props.match.params.member;

        console.log('auth', valid, member)

        if(valid) {
           this.props.history.push('/b');
           return;
        }
      } catch(err) {
        console.log('err', err);
      }
    }

    render() {
        return (
            <div>
              <Switch>
                <Route exact path="/account" render={routeProps => <LoginComponent {...routeProps} />} />
                <Route exact path="/account/login" render={routeProps => <LoginComponent {...routeProps} />} />
                <Route exact path="/account/verify" render={routeProps => <VerifyAccountComponent {...routeProps} />} />
                <Route exact path="/account/create-account" render={routeProps => <CreateAccountComponent {...routeProps} />} />
                <Route exact path="*" render={routeProps => <GenericNotFound {...routeProps} />} />
              </Switch>
            </div>
        );
    }
});

/*

*/


const style = {
    height: '100vh',
    width: '100%',
    backgroundColor: '#DCDCDC'
}

const pointStyle = {
    width : '100%',
    position : 'absolute',
    top:'60px',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 'bold'
};




export default AccountComponent;
