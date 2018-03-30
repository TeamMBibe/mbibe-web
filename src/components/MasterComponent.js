import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import BusinessComponent from './business/BusinessComponent'
import AccountComponent from './accounts/AccountComponent'
import GenericNotFound from './util/GenericNotFound'

const MasterComponent = observer(class MasterComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              <Switch>
                <Route exact path="/" render={routeProps => <AccountComponent {...routeProps} />} />
                <Route path="/b" render={routeProps => <BusinessComponent {...routeProps} />} />
                <Route path="/account" render={routeProps => <AccountComponent {...routeProps} />} />
                <Route exact path="*" render={routeProps => <GenericNotFound {...routeProps} />} />

              </Switch>
            </div>
        );
    }
});


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




export default MasterComponent;
