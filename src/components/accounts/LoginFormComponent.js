import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withRouter } from 'react-router'
import MobileHeader from "../../components/util/MobileHeader"
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import mainLogo from '../../assets/mbibe_icon.png'
import Background from '../../assets/login_background.png'
import accountManagement from '../management/AccountManagement'

const LoginFormComponent = observer(class LoginFormComponent extends Component {

  constructor(props) {
      super(props);
      this.state = {
          email: "",
          password: "",
      };
  }

  componentWillMount() {
    this.isLoggedIn();
  }

  async isLoggedIn() {
    try {
      let email = await accountManagement.isLoggedIn();
      if(email) this.props.history.push('/profile')
    } catch(err) {
      return null;
    }
  }

  validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
  }

  handleCreateButtonOnClick = event => {
      this.props.history.push('/create-account')
  }

  handleSubmit = async event => {
      event.preventDefault();
      try {
          let user = await accountManagement.login(this.state.email, this.state.password)
          this.props.history.push('/profile')
      } catch (e) {
          alert(e);
      }
  }

  render() {

      return (
          <div style={styles.pageStyle}>
              <MuiThemeProvider>

                  <div className="row">
                      <img src={mainLogo} className="col-xs-6 col-xs-offset-3 col-sm-2 col-sm-offset-5 col-md-2 col-md-offset-5" style={{marginTop:'15px'}}/>
                  </div>

                  <div style={styles.loginCardStyle} className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4">
                      <form onSubmit={this.handleSubmit}>

                          <FormGroup controlId="email" bsSize="large" className="row">
                              <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0}}>
                                  <TextField
                                      hintText="E-mail"
                                      hintStyle={styles.hintBoxStyle}
                                      inputStyle={styles.textBoxStyle}
                                      underlineStyle={styles.underlineStyle}
                                      defaultValue={this.state.email}
                                      onChange={this.handleChange}
                                      style={{width:'100%', height:'50px'}}
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
                                      underlineStyle={styles.underlineStyle}
                                      hintStyle={styles.hintBoxStyle}
                                      inputStyle={styles.textBoxStyle}
                                      type="password"
                                      style={{width:'100%', height:'50px'}}
                                      id="password">
                                  </TextField>
                              </div>
                          </FormGroup>

                          <div className="row" style={{marginTop:'10px'}}>
                              <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1"  style={{padding:0}}>
                                  <RaisedButton
                                      label="Sign In"
                                      buttonStyle={styles.loginButtonStyle}
                                      overlayStyle={styles.loginButtonStyle}
                                      style={{width:'100%', borderRadius:'100px'}}
                                      type="submit"
                                      backgroundColor="#FFAD0A"
                                      disabled={!this.validateForm()}/>
                              </div>
                          </div>


                          <div className="row">
                              <div className="col-xs-4 col-xs-offset-2 col-sm-4 col-sm-offset-1 col-md-4 col-md-offset-1" style={{padding:0}}>
                                  <FlatButton
                                      label="Create"
                                      onClick={this.handleCreateButtonOnClick}
                                      style={{width:'100%'}}
                                      labelStyle={styles.optionButtonStyle} />
                              </div>
                              <div className="col-xs-4 col-sm-4 col-sm-offset-1 col-md-4 col-md-offset-1" style={{padding:0}}>
                                  <FlatButton
                                      label="Password"
                                      style={{width:'100%'}}
                                      labelStyle={styles.optionButtonStyle} />
                              </div>
                          </div>
                      </form>
                  </div>
              </ MuiThemeProvider>
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
     overflow:'hidden',
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
    backgroundColor:"#373536",
    color:'#DCDCDC',
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



export default LoginFormComponent;
