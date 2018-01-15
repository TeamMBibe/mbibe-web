import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import MediaQuery from 'react-responsive';
import { withRouter, Redirect } from 'react-router'

import MobileLoginPage from './MobileLoginPage'
import DesktopLoginPage from './DesktopLoginPage'

const LoginPage = observer(class LoginPage extends Component {

    constructor(props) {
      super(props)
    }

    render() {
      console.log('here')
      console.log(this.props)
        return (
            <div>
                <MediaQuery minDeviceWidth={1224}>
                    <MobileLoginPage history={this.props.history} registrationStage={this.props.registrationStage}/>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                    <MobileLoginPage history={this.props.history} registrationStage={this.props.registrationStage}/>
                </MediaQuery>
            </div>
        );
    }
});


export default LoginPage;
