import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter } from 'react-router'
import SelectBusinessComponent from "./SelectBusinessComponent"
import BusinessHomeComponent from "./with_profile/BusinessHomeComponent"
import BusinessGeneralInfoComponent from "./no_profile/BusinessGeneralInfoComponent"
import BusinessJoinComponent from "./BusinessJoinComponent"
import GenericNotFound from '../util/GenericNotFound'
import headerStore from '../../data_stores/HeaderStore'
import userStore from '../../data_stores/UserStore'
import accountManagement from '../management/AccountManagement'
import businessManagement from '../management/BusinessManagement'

const BusinessComponent = observer(class BusinessComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isWorking:false,
          isAuthenticated:false
        }
    }

    async componentWillMount() {
      let validUser = await accountManagement.isLoggedIn()
      let area = localStorage.getItem('selectedBusiness');
      let profile = localStorage.getItem('selectedBusinessMemberProfile')

      if(area && profile && area !== 'null' && profile !== 'null') {
        userStore.businessObject = JSON.parse(area);
        userStore.memberObject = JSON.parse(profile);
        console.log('1')
      } else if((!area || area === 'null') && this.props.location.pathname !== "/b") {
        console.log('2')
        localStorage.setItem('selectedBusiness', null);
        this.props.history.push('/b')
      } else if((!profile || profile === 'null')) {
        const bo = JSON.parse(area);
        console.log('3', bo)
        userStore.businessObject = bo;
        let p = await businessManagement.getMemberProfileForBusiness(bo.business_uuid.S, userStore.email)
        if(!p) this.props.history.push('/b/join')
        else userStore.memberObject = p
      }

      this.setState({'isWorking':false, 'isAuthenticated':validUser});
    }

   async authenticateBusiness() {

  }

  render() {

    if(this.state.isWorking) {
      console.log('working')
      return (
        <div>Loading...</div>
      )
    } else if(this.state.isAuthenticated) {
      console.log('good')
      return (
        <Switch>
          <Route exact path="/b" render={routeProps => <SelectBusinessComponent {...routeProps} />} />
          <Route exact path="/b/join" render={routeProps => <BusinessJoinComponent {...routeProps} />} />
          <Route path="/b/:local_url" render={routeProps => <BusinessHomeComponent {...routeProps} />} />
        </Switch>
      )
    } else if(!this.state.isAuthenticated) {
      console.log('bad')
      return (
        <Switch>
          <Route exact path="/b" render={routeProps => <GenericNotFound {...routeProps} />} />
          <Route exact path="/b/:local_url" render={routeProps => <BusinessGeneralInfoComponent {...routeProps} />} />
        </Switch>
      )
    }
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




export default BusinessComponent;
