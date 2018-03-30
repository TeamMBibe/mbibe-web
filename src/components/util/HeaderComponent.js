import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import headerStore from '../../data_stores/HeaderStore'
import userStore from '../../data_stores/UserStore'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { withRouter, Redirect } from 'react-router'

const HeaderComponent = observer(class HeaderComponent extends Component {

    constructor(props) {
        super(props);
    }

    handleToggle = (e) =>  {
        headerStore.updateDrawerStatus(!headerStore.drawerOpen);
        e.stopPropagation();
    }

    handleInfoRequest = (e) =>  {
        this.props.history.push('/place/' + userStore.businessObject.BusinessName.S + '/info');
        headerStore.updateDrawerStatus(!headerStore.drawerOpen);
        e.stopPropagation();
    }

    handleLeaveRequest = (e) =>  {
        userStore.leaveArea();
        this.props.history.push('/b');
        headerStore.updateDrawerStatus(!headerStore.drawerOpen);
        e.stopPropagation();
    }

    handleSignOutRequest = (e) =>  {
        userStore.signUserOut();
        this.props.history.push('/account/login');
        headerStore.updateDrawerStatus(!headerStore.drawerOpen);
        e.stopPropagation();
    }

    handleMenuSelection = (menu, e) =>  {
      this.props.history.push('/place/' + userStore.businessObject.BusinessName.S + '/menu/' + menu);
      headerStore.updateDrawerStatus(!headerStore.drawerOpen);
        e.stopPropagation();
    }

    renderMenuItems() {
      console.log(userStore.businessObject.Menus.M)
      return Object.keys(userStore.businessObject.Menus.M).map((type) => {
            return (
                <MenuItem onClick={this.handleMenuSelection.bind(null, type)}>{type}</MenuItem>
            )
        })
    }

    render() {
      console.log(userStore.memberObject);
        return (
            <div>
              <MuiThemeProvider>
                <AppBar
                    style={{ position: "fixed"}}
                    title={headerStore.headerTitle}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onClick={this.handleToggle}
                >

                </AppBar>

                <Drawer open={headerStore.drawerOpen}>

                    <MenuItem onClick={this.handleInfoRequest}>Info</MenuItem>
                    <MenuItem onClick={this.handleLeaveRequest}>Leave {userStore.businessObject.business_name.S}</MenuItem>
                    <MenuItem onClick={this.handleSignOutRequest}>Log Out</MenuItem>
                </Drawer>
                <div style={{width:'100%',height:'80px'}}></div>
              </MuiThemeProvider>
            </div>
        );
    }
});

const Options = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    onClick={() => props.history.push('/place/' +userStore.businessObject.BusinessName.S + '/info')}
  >

  </IconMenu>
);

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




export default HeaderComponent;
