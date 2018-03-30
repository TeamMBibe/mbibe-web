import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import headerStore from '../../data_stores/HeaderStore'
import userStore from '../../data_stores/UserStore'
import accountManagement from '../management/AccountManagement'
import businessManagement from '../management/BusinessManagement'

const BusinessJoinComponent = observer(class BusinessJoinComponent extends Component {

    constructor(props) {
      super(props)
      console.log('join props', props)
    }

    handleJoinOnClick = async event => {
        try {
            await businessManagement.addMemberToBusiness(userStore.businessObject.business_uuid.S, userStore.email)
            this.getMemberProfile(userStore.businessObject.business_uuid.S)
            .then(mo => userStore.memberObject = mo)
            this.props.history.push('/b')
        } catch (e) {
            console.log(e)
        }
    }

    async getMemberProfile(uuid) {
      return await businessManagement.getMemberProfileForBusiness(uuid, userStore.email);
    }

    render() {
      console.log('join userstore', userStore)
      return (
          <div>
            <MuiThemeProvider>
              Need to join {userStore.businessObject.business_name.S}
              <br />
              <RaisedButton
                  primary={true}
                  label="Join"
                  onClick={this.handleJoinOnClick}
                  />
            </MuiThemeProvider>
          </div>
      );
    }
});




export default BusinessJoinComponent;
