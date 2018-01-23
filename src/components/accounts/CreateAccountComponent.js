import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withRouter } from 'react-router'
import MobileHeader from "../../components/util/MobileHeader"
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import mainLogo from '../../assets/mbibe_icon.png'
import Background from '../../assets/login_background.png'
import accountManagement from '../management/AccountManagement'

const CreateAccountComponent = observer(class CreateAccountComponent extends Component {

  constructor(props) {
      super(props);
      this.state = {
          email:'',
          password:'',
          confirmPassword:'',
          phone:''
      };
  }

  validateForm() {
    return this.state.email.length > 0
          && this.state.password.length > 0
          && this.state.phone.length > 0
          && this.state.confirmPassword === this.state.password;
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
  }

  handleSubmit = async event => {
      event.preventDefault();
      try {
          await accountManagement.signup(this.state.email, this.state.password, this.state.phone)
          this.props.history.push('/verify-account')
      } catch (e) {
          alert(e);
      }
  }

  render() {

      return (
        <div style={styles.pageStyle}>
          <MuiThemeProvider>
            <div className="row">
                <img src={mainLogo} className="col-xs-6 col-xs-offset-3 col-sm-2 col-sm-offset-5 col-md-2 col-md-offset-5" style={{marginTop:'15px', marginBottom:'20px'}}/>
            </div>

              <form onSubmit={this.handleSubmit}>
                  <FormGroup controlId="email" bsSize="large" className="row">
                      <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0}}>
                          <TextField
                              hintText="E-mail"
                              style={{width:'100%', height:'50px'}}
                              hintStyle={styles.hintBoxStyle}
                              inputStyle={styles.textBoxStyle}
                              underlineStyle={styles.underlineStyle}
                              defaultValue={this.state.email}
                              onChange={this.handleChange}
                              type="email"
                              id="email">
                          </TextField>
                      </div>
                  </FormGroup>

                  <FormGroup controlId="password" bsSize="large" className="row">
                      <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0}}>
                          <TextField hintText="Password"
                              value={this.state.password}
                              onChange={this.handleChange}
                              hintStyle={styles.hintBoxStyle}
                              inputStyle={styles.textBoxStyle}
                              underlineStyle={styles.underlineStyle}
                              style={{width:'100%', height:'50px'}}
                              type="password"
                              id="password">
                          </TextField>
                      </div>
                  </FormGroup>

                  <FormGroup controlId="confirmpassword" bsSize="large" className="row">
                      <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0}}>
                          <TextField hintText="Confirm Password"
                              value={this.state.confirmPassword}
                              onChange={this.handleChange}
                              hintStyle={styles.hintBoxStyle}
                              inputStyle={styles.textBoxStyle}
                              underlineStyle={styles.underlineStyle}
                              style={{width:'100%', height:'50px'}}
                              type="password"
                              id="confirmPassword">
                          </TextField>
                      </div>
                  </FormGroup>

                  <FormGroup controlId="phone" bsSize="large" className="row">
                      <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0}}>
                          <TextField hintText="Phone"
                              value={this.state.phone}
                              onChange={this.handleChange}
                              hintStyle={styles.hintBoxStyle}
                              inputStyle={styles.textBoxStyle}
                              underlineStyle={styles.underlineStyle}
                              style={{width:'100%', height:'50px'}}
                              type="telephone"
                              id="phone">
                          </TextField>
                      </div>
                  </FormGroup>

                  <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0}}>
                        <RaisedButton
                            label="Create"
                            buttonStyle={styles.loginButtonStyle}
                            overlayStyle={styles.loginButtonStyle}
                            style={{width:'100%', borderRadius:'100px'}}
                            backgroundColor="#FFAD0A"
                            type="submit"
                            disabled={!this.validateForm()}/>
                    </div>
                </div>
              </form>
            </MuiThemeProvider>
          </div>
      );
  }
});

const styles = {
  loginCardStyle: {
      marginTop:'50px'
  },
  pageStyle: {
    backgroundImage: `url(${ Background })`,
     backgroundRepeat  : 'no-repeat',
     backgroundPosition: 'center',
      height: '100vh',
      width: '100vw',
  },
  hintBoxStyle: {
    textAlign:'center',
    color:'#DCDCDC',
    width:'100%'
  },
  textBoxStyle : {
    borderColor: "#373536",
    borderWidth:'1px',
    borderStyle:'solid',
    borderRadius:'100px',
    width:'100%',
    color:'#373536',
    textAlign:'center',
    opacity:'0.8'
  },
  errorStyle: {
      color: "#FF00FF",
  },
  underlineStyle: {
      borderColor: "#373536",
      borderWidth:'0px'
  },
  floatingLabelStyle: {
      color: "#FF00FF",
  },
  floatingLabelFocusStyle: {
      color: "#FF00FF",
  },
  loginButtonStyle: {
      borderRadius:'100px'
  },
  optionButtonStyle: {
    fontSize:'10px',
    width:'100%'
  }
};



export default CreateAccountComponent;
