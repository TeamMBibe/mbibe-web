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
import businessManagement from '../management/BusinessManagement'
import userStore from '../../data_stores/UserStore'
import Background from '../../assets/login_background.png'
import GeneralUtils from '../util/GeneralUtils'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';




const SelectBusinessComponent = observer(class SelectBusinessComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          open: false,
          tiles: false
        };
    }

    componentWillMount() {
      this.getLocalBusinesses().then(t => this.setState ({
        tiles: t
      }));
    }

    handleTileClick = (uuid, event) => {
      try {
        this.getSelectedBusiness(uuid)
        .then(bo => {
          localStorage.setItem('selectedBusiness', JSON.stringify(bo))
          return bo
        })
        .then(bo => { userStore.businessObject = bo })

        this.getMemberProfile(uuid)
        .then(mo => {
          userStore.memberObject = mo
          return mo
        })
        .then(mo => localStorage.setItem('selectedBusinessMemberProfile', JSON.stringify(mo)))

        this.props.history.push("/b/" + userStore.businessObject.local_url.S);
      } catch(err) {
        alert(err);
      }
    }

    renderLoadingScreen() {
      return (<div style={styles.loadingTextStyle}>Loading Location</div>);
    }

    getClosestBusiness(location) {
      let closestBO = null
      let closestDist = -1
      this.state.tiles.forEach(item => {
        const dist = GeneralUtils.getDistanceFromLatLonInMiles(location.latitude,location.longitude,item.latitude,item.longitude)
        if(dist < 0.5 && (closestDist === -1 || closestDist > dist)) {
          closestDist = dist
          closestBO = item
        }
      })
      return closestBO
    }

    renderBusinessesGrid(location) {
      return(
        <MuiThemeProvider>
        <div>({location.latitude}, {location.longitude})</div>
          <div style={styles.titleTextStyle}>What place are you at?</div>

          <div style={styles.root} onClick={this.handleToggle}>

              <GridList
                  cellHeight={50}
                  style={styles.gridList}
              >
                  {this.state.tiles.map((tile) => {
                    const dist = GeneralUtils.getDistanceFromLatLonInMiles(location.latitude,location.longitude,tile.latitude,tile.longitude)
                    console.log(dist)
                    return(
                          <GridTile
                              key={tile.businessUUID}
                              title={<span><span>{tile.businessName}</span>  <span style={{fontSize:'12px'}}>({dist} mi)</span></span>}
                              cols={2}
                              rows={1}
                              style={{cursor:'pointer'}}
                              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                              onClick={this.handleTileClick.bind(null, tile.businessUUID)}
                          >
                          </GridTile>
                    )
                  }
                  )}
              </GridList>
          </div>
        </MuiThemeProvider>
      )
    }

    renderWelcomeScreen(closestBusinessObject) {
      console.log(closestBusinessObject)
      return (
        <MuiThemeProvider>
        <div style={{marginTop:'30%'}}></div>
          <div style={{fontSize:'18px',textAlign:'center',width:'100%',color:'#DCDCDC'}}>Welcome to</div>
          <div style={{fontSize:'28px',textAlign:'center',width:'100%',color:'#FFFFFF'}}>{closestBusinessObject.businessName}</div>

          <div className="row" style={{marginTop:'10%'}}>
              <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1"  style={{padding:0}}>
                  <RaisedButton
                      label="I'm Here"
                      style={{width:'100%', borderRadius:'100px'}}
                      onClick={this.handleTileClick.bind(null, closestBusinessObject.businessUUID)}
                      type="submit"
                      backgroundColor="#FFAD0A"/>
              </div>
          </div>
          <div className="row">
              <div className="col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4" style={{padding:0}}>
                  <FlatButton
                      label="Wrong Place"
                      //onClick={this.handleSignInButtonOnClick}
                      style={{width:'100%'}}
                      labelStyle={styles.optionButtonStyle} />
              </div>
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

    async getLocalBusinesses() {
      return await businessManagement.getBusinessesWithGeoLocations();
    }

    async getSelectedBusiness(uuid) {
      return await businessManagement.getBusiness(uuid);
    }

    async getMemberProfile(uuid) {
      return await businessManagement.getMemberProfileForBusiness(uuid, userStore.email);
    }

    handleToggle = () => headerStore.forceDrawerClose();

    render() {
        const location = this.getClientLocation();

        if(!this.state.tiles) {
          return (
            <div style={styles.pageStyle}>
            {this.renderLoadingScreen()}
            </div>
          )
        } else {
          const closestBO = this.getClosestBusiness(location)
          if(!closestBO)
            return (
              <div style={styles.pageStyle}>
              {this.renderBusinessesGrid(location)}
              </div>
            )
          else {
            console.log('ghere')
            return (
              <div style={styles.pageStyle}>
              {this.renderWelcomeScreen(closestBO)}
              </div>
            )
          }

        }
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
    loadingTextStyle: {
      textAlign:'center',
      width:'100%',
      fontSize:'18px',
      color:'#FFFFFF',
      marginTop:'30%',
    },
    titleTextStyle: {
      textAlign:'center',
      width:'100%',
      fontSize:'18px',
      color:'#FFFFFF',
      marginTop:'10%',
      marginBottom:'5%'
    },
    pageStyle: {
      backgroundImage: `url(${ Background })`,
       backgroundRepeat  : 'no-repeat',
       backgroundPosition: 'center',
       overflow:'hidden',
      height: '100vh',
      width: '100vw',
    },
    optionButtonStyle: {
      fontSize:'10px',
      width:'100%'
    }
};


export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(SelectBusinessComponent);
