import React, { Component } from 'react';
import { observer } from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import areaManagement from '../management/AreaManagement'
import userStore from '../../data_stores/UserStore'

const JoinAreaComponent = observer(class JoinAreaComponent extends Component {

    constructor(props) {
      super(props)
    }

    handleJoinOnClick = async event => {
        try {
            await areaManagement.addMemberToArea(userStore.businessObject.BusinessUUID.S, userStore.email)

            this.getMemberProfile(userStore.businessObject.BusinessUUID.S)
            .then(mo => userStore.memberObject = mo)
        } catch (e) {
            console.log(e)
        }
    }

    async getMemberProfile(uuid) {
      return await areaManagement.getMemberProfileForArea(uuid, userStore.email);
    }

    render() {
      return (
          <div>
            <MuiThemeProvider>
              Need to join area
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


export default JoinAreaComponent;
