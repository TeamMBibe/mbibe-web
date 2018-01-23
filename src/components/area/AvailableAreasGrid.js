import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import headerStore from '../../data_stores/HeaderStore'
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {geolocated} from 'react-geolocated';
import areaManagement from '../management/AreaManagement'
import userStore from '../../data_stores/UserStore'

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
};



const AvailableAreasGrid = observer(class AvailableAreasGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
          open: false,
          tiles: false
        };
    }

    componentWillMount() {
      this.getLocalAreas().then(t => this.setState ({
        tiles: t
      }));
    }

    handleTileClick = (uuid, event) => {
      try {
        this.getSelectedBusiness(uuid)
        .then(bo => {
          localStorage.setItem('selectedArea', JSON.stringify(bo))
          return bo
        })
        .then(bo => { userStore.businessObject = bo })

        this.getMemberProfile(uuid)
        .then(mo => {
          userStore.memberObject = mo
          return mo
        })
        .then(mo => localStorage.setItem('selectedAreaMemberProfile', JSON.stringify(mo)))
      } catch(err) {
        alert(err);
      }
    }

    renderLoadingScreen() {
      return (<div>Loading</div>);
    }

    renderAreasGrid(location) {
      return(
        <MuiThemeProvider>
          <div style={styles.root} onClick={this.handleToggle}>
              <div>{location.latitude} -- {location.longitude}</div>
              <GridList
                  cellHeight={50}
                  style={styles.gridList}
              >
                  {this.state.tiles.map((tile) => (
                      <GridTile
                          key={tile.businessUUID}
                          title={tile.businessName}
                          cols={2}
                          rows={1}
                          style={{cursor:'pointer'}}
                          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                          onClick={this.handleTileClick.bind(null, tile.businessUUID)}
                      >
                      </GridTile>
                  ))}
              </GridList>
          </div>
        </MuiThemeProvider>
      )
    }

    getClientLocation() {
      if(!this.props.isGeolocationAvailable) return {latitude:'unavailable',longitude:'unavailable'};
      else if(!this.props.isGeolocationEnabled) return {latitude:'not enabled', longitude:'not enabled'};
      else if(this.props.coords){
        return {
          latitude:this.props.coords.latitude,
          longitude:this.props.coords.longitude
        }
      } else {
        return {latitude:'retrieving', longitude:'retrieving'}
      }
    }

    async getLocalAreas() {
      return await areaManagement.getAreasAndGeoLocations();
    }

    async getSelectedBusiness(uuid) {
      return await areaManagement.getArea(uuid);
    }

    async getMemberProfile(uuid) {
      return await areaManagement.getMemberProfileForArea(uuid, userStore.email);
    }

    handleToggle = () => headerStore.forceDrawerClose();

    render() {
        const location = this.getClientLocation();
        if(!this.state.tiles) {
          return this.renderLoadingScreen();
        } else {
          return this.renderAreasGrid(location);
        }
    }


});

AvailableAreasGrid.defaultProps = {
    //userStore: userStore
};


export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(AvailableAreasGrid);
