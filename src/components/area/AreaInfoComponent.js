import React, { Component } from 'react';
import { observer } from "mobx-react";
import {GridList, GridTile} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import areaManagement from '../management/AreaManagement'
import userStore from '../../data_stores/UserStore'
import headerStore from '../../data_stores/HeaderStore'
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

const AreaInfoComponent = observer(class AreaInfoComponent extends Component {

    constructor(props) {
      super(props)
    }

    renderAreaHours() {
      console.log(userStore.businessObject.Hours.M)
      return (Object.keys(userStore.businessObject.Hours.M).map(key => {
        return (<div>{key}: {userStore.businessObject.Hours.M[key].S}</div>)
      }))
    }

    render() {
      const t = this.renderAreaHours();
      console.log(t)
      return (
          <div style={{width:'100%', height:'auto'}}>
            <MuiThemeProvider>
              <Paper style={style} zDepth={3}>
                {this.renderAreaHours()}
              </Paper>
            </MuiThemeProvider>
          </div>
      );
    }
});

const style = {
  height: 'auto',
  width: '90%',
  margin: '5%',
  textAlign: 'center',
  display: 'inline-block',
};


export default AreaInfoComponent;
