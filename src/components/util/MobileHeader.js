import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import headerStore from '../../data_stores/HeaderStore'
import userStore from '../../data_stores/UserStore'
import { withRouter, Redirect } from 'react-router'

const MobileHeader = observer(class MobileHeader extends Component {

    constructor(props) {
        super(props);
    }

    handleToggle = (e) =>  {
        headerStore.updateDrawerStatus(!headerStore.drawerOpen);
        e.stopPropagation();
    }

    handleLeaveRequest = (e) =>  {
        userStore.leaveArea();
        this.props.history.push('/profile');
        headerStore.updateDrawerStatus(!headerStore.drawerOpen);
        e.stopPropagation();
    }

    handleSignOutRequest = (e) =>  {
        userStore.signUserOut();
        this.props.history.push('/login');
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

                <AppBar
                    style={{ position: "fixed", height:'100px'}}
                    title={headerStore.headerTitle}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onClick={this.handleToggle}
                >
                    <div style={pointStyle}>Points: {userStore.memberObject.Points.N}</div>
                </AppBar>

                <Drawer open={headerStore.drawerOpen}>
                    {this.renderMenuItems()}
                    <MenuItem onClick={this.handleLeaveRequest}>Leave {userStore.businessObject.BusinessName.S}</MenuItem>
                    <MenuItem onClick={this.handleSignOutRequest}>Log Out</MenuItem>
                </Drawer>
                <div style={{width:'100%',height:'90px'}}></div>
            </div>
        );
    }
});

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




export default MobileHeader;
