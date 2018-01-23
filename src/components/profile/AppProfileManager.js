import React, { Component } from 'react';
import { observer } from "mobx-react";
import headerStore from '../../data_stores/HeaderStore'
import userStore from '../../data_stores/UserStore'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AreaHomeProfileComponent from './AreaHomeProfileComponent'

const AppProfileManager = observer(class AppProfileManager extends Component {

    constructor(props) {
      super(props)
    }

    render() {
        return (
            <div>
              <MuiThemeProvider>
                <FloatingActionButton style={style} zDepth={3}>
                  <ContentAdd />
                </FloatingActionButton>
                <AreaHomeProfileComponent />
              </MuiThemeProvider>
            </div>
        );
    }
});

const style = {
    right: 20,
    bottom:20,
    position: 'fixed',
    zIndex:999
};


export default AppProfileManager;
