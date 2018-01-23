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
import AvailableAreasGrid from '../components/area/AvailableAreasGrid'
import AppProfileManager from '../components/profile/AppProfileManager'
import JoinAreaComponent from '../components/area/JoinAreaComponent'

const MasterProfilePage = observer(class MasterProfilePage extends Component {

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
    console.log(userStore.memberObject)
    if(!this.state.identityValidated) {
      return (<div>Verifying</div>)
    } else if(this.state.profileRequest) {
      return (<div>Cannot request profiles yet.</div>)
    } else if(!userStore.businessObject) {
      return (<AvailableAreasGrid />)
    } else if(!userStore.memberObject) {
      return(<JoinAreaComponent />)
    } else {
      this.props.history.push('/place/' + userStore.businessObject.BusinessName.S);
      return (<div></div>);
    }
  }
});

const styles = {
  pageStyle: {
      backgroundColor: '#FFAD0A',
      height: '100vh',
      width: '100vw',
  },
};

export default MasterProfilePage;
