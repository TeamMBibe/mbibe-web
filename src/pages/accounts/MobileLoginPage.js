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
          stage:props.registrationStage,
      }
  }

    handleStage = (stageValue) => {
        this.setState({stage: stageValue});
        //alert(stageValue);
    }

    render() {
        var component = this.state.stage;
        console.log(this.props);
        return (
          <div>
              {component === 'SIGNIN' ? (
                  <LoginFormComponent history={this.props.history} onHandleStage={this.handleStage}/>
              ) : component === 'CREATEACCOUNT' ? (
                  <CreateAccountComponent history={this.props.history} onHandleStage={this.handleStage} />
              ) : component === 'VERIFY' ? (
                  <VerifyAccountComponent history={this.props.history} onHandleStage={this.handleStage} />
              ) : null}
          </div>
        );
    }
});





export default MobileLoginPage;
