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

    render() {
      console.log(userStore.memberObject);
        return (
            <div>

                <AppBar
                    style={{ position: "fixed", height:'100px'}}
                    title={userStore.businessObject.BusinessName.S}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onClick={this.handleToggle}
                >
                    <div style={pointStyle}>Points: 0</div>
                </AppBar>

                <Drawer open={headerStore.drawerOpen}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
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
