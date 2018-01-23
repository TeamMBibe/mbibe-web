import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import MediaQuery from 'react-responsive';
import { withRouter, Redirect } from 'react-router'
import PropTypes from 'prop-types';
import App from "../App"
import LoginPage from "../pages/accounts/LoginPage"
import GenericNotFound from "../components/util/GenericNotFound"
import MobileHeader from "../components/util/MobileHeader"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import headerStore from '../data_stores/HeaderStore'
import userStore from '../data_stores/UserStore'
import accountManagement from '../components/management/AccountManagement'
import areaCustomization from '../components/util/AreaCustomization'
import AreaMenuComponent from '../components/profile/AreaMenuComponent'
import AppProfileManager from '../components/profile/AppProfileManager'

const MasterPlacePage = observer(class MasterPlacePage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
      super(props);
      this.state = {
        identityValidated: false,
        profileRequest: false,
      }
  }

  componentWillMount() {
    this.authenticateUser()
    this.authenticateArea()
    headerStore.updateHeaderTitle(userStore.businessObject.BusinessName.S)
  }

  handleOnClick = () => {
      headerStore.updateDrawerStatus(false);
  }

  async authenticateArea() {
    let area = localStorage.getItem('selectedArea');
    let profile = localStorage.getItem('selectedAreaMemberProfile')
    if(area && profile) {
      userStore.businessObject = JSON.parse(area);
      userStore.memberObject = JSON.parse(profile);
    } else {
      this.props.history.push('/profile')
    }
  }

  async authenticateUser() {
    try {
      let valid = await accountManagement.isLoggedIn()
      const member = this.props.match.params.member;

      if(!valid) {
         this.props.history.push('/login');
         return;
      } else if(valid !== member) {
        this.setState({profileRequest:member, identityValidated:true})
      } else {
        this.setState({identityValidated:true})
      }
    } catch(err) {
      this.props.history.push('/login')
    }
  }

  render() {

    return(
      <div onClick={this.handleOnClick} style={areaCustomization.getMainStyle()}>
        <MuiThemeProvider>
          <MobileHeader history={this.props.history}/>
          <Switch>
            <Route exact path="/place/:location" render={routeProps => <AppProfileManager {...routeProps} history={this.props.history} />} />
            <Route exact path="/place/:location/menu" render={routeProps => <AreaMenuComponent {...routeProps} history={this.props.history} />} />
            <Route exact path="/place/:location/menu/:title" render={routeProps => <AreaMenuComponent {...routeProps} history={this.props.history} />} />
            <Route exact path="*" component={GenericNotFound} />
          </Switch>
        </MuiThemeProvider>
      </div>
    )
  }
});


/*
<div onClick={this.handleOnClick} style={areaCustomization.getMainStyle()}>
  <MuiThemeProvider>
    <MobileHeader history={this.props.history}/>
    <AppProfileManager history={this.props.history}/>
  </MuiThemeProvider>
</div>

*/

export default MasterPlacePage;
