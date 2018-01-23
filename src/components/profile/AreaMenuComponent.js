import React, { Component } from 'react';
import { observer } from "mobx-react";
import {GridList, GridTile} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import areaManagement from '../management/AreaManagement'
import userStore from '../../data_stores/UserStore'
import headerStore from '../../data_stores/HeaderStore'
import Divider from 'material-ui/Divider';

const AreaMenuComponent = observer(class AreaMenuComponent extends Component {

    constructor(props) {
      super(props)
    }

    renderMenu() {
      if(!this.props.match.params.title && Object.keys(userStore.businessObject.Menus.M).length > 1) {
        return (Object.keys(userStore.businessObject.Menus.M).map((tile) => (
                    <RaisedButton
                        label={tile}
                        style={styles.loginButtonStyle}/>
                  )))
      } else if(Object.keys(userStore.businessObject.Menus.M).length === 1) {
        const obj = userStore.businessObject.Menus.M[0].M;
        return (Object.keys(userStore.businessObject.Menus.M[0].M).map((key) => {
          this.renderMenuSection(key, obj[key])
        }));
      } else if(this.props.match.params.title) {
        const obj = userStore.businessObject.Menus.M[this.props.match.params.title].M;
        return (Object.keys(userStore.businessObject.Menus.M[this.props.match.params.title].M).map((key) => {
          return (
            <div>
              <GridList
                cellHeight={50}
                style={styles.gridList}>
                {this.renderMenuSection(key, obj[key])}
              </GridList>
              <Divider />
            </div>
        )
        }));
      } else {
        return (<div>Other Options</div>)
      }
    }

    renderMenuSection(sectionName, sectionObject) {
      console.log(sectionName, sectionObject)
      const ht = sectionObject.L.map((item) => {
            return (<GridTile
              key={item.M.name.S}
              title={item.M.name.S}
              cols={2}
              rows={1}
              subtitle={item.M.amount.N}>
            </GridTile>)
          })
          console.log(ht);
          return ht
    }

    render() {
      const t = this.renderMenu();
      console.log(t)
      return (
          <div>
            <MuiThemeProvider>
              {this.renderMenu()}
            </MuiThemeProvider>
          </div>
      );
    }
});

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '100%',
        height: '80%',
        overflowY: 'auto',
        margin:'2%'
    },
    loginButtonStyle: {
        width:'100%',
    }
};


export default AreaMenuComponent;
