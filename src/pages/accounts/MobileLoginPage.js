import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withRouter } from 'react-router'
import LoginFormComponent from '../../components/accounts/LoginFormComponent'
import CreateAccountComponent from '../../components/accounts/CreateAccountComponent'
import VerifyAccountComponent from '../../components/accounts/VerifyAccountComponent'

const MobileLoginPage = observer(class MobileLoginPage extends Component {

  constructor(props) {
      super(props);
      this.state = {
          stage:"SIGNIN",
      }
  }

    handleStage = (stageValue) => {
        this.setState({stage: stageValue});
        //alert(stageValue);
    }

    render() {
        var component = this.state.stage;
        return (
          <div>
              {component === 'SIGNIN' ? (
                  <LoginFormComponent onHandleStage={this.handleStage}/>
              ) : component === 'CREATEACCOUNT' ? (
                  <CreateAccountComponent onHandleStage={this.handleStage} />
              ) : component === 'VERIFY' ? (
                  <VerifyAccountComponent onHandleStage={this.handleStage} />
              ) : null}
          </div>
        );
    }
});





export default MobileLoginPage;
