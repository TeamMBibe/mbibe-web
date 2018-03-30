import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import GenericNotFound from '../../util/GenericNotFound'
import BusinessCustomHomeComponent from './BusinessCustomHomeComponent'
import HeaderComponent from '../../util/HeaderComponent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const BusinessHomeComponent = observer(class BusinessHomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              <MuiThemeProvider>
                <HeaderComponent history={this.props.history} />
                <Switch>
                  <Route exact path="/b/:local_url" render={routeProps => <BusinessCustomHomeComponent {...routeProps} />} />
                  <Route exact path="/b/:local_url/menu" render={routeProps => <GenericNotFound {...routeProps} />} />
                  <Route exact path="/b/:local_url/rewards" render={routeProps => <GenericNotFound {...routeProps} />} />
                  <Route exact path="/b/:local_url/me" render={routeProps => <GenericNotFound {...routeProps} />} />
                  <Route exact path="/b/:local_url/*" render={routeProps => <GenericNotFound {...routeProps} />} />
                </Switch>
              </MuiThemeProvider>
            </div>
        );
    }
});





export default BusinessHomeComponent;
