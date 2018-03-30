import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import headerStore from '../../../data_stores/HeaderStore'
import userStore from '../../../data_stores/UserStore'
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';

const BusinessCustomHomeComponent = observer(class BusinessCustomHomeComponent extends Component {

    constructor(props) {
        super(props);
        headerStore.headerTitle = userStore.businessObject.business_name.S
    }

    renderAdvertisements = () => {

    }

    render() {
        return (
          <div style={{height:'100vh'}}>
            <GridList
              cellHeight={180}
              style={styles.gridList}
            >
              <Subheader>December</Subheader>
              {tilesData.map((tile) => (
                <GridTile
                  key={tile.img}
                  title={tile.title}
                  subtitle={<span>by <b>{tile.author}</b></span>}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                >
                  <img src={tile.img} />
                </GridTile>
              ))}
            </GridList>
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
    width: 500,
    height: 'auto',
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: '../../../images/mbibe_icon.png',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

export default BusinessCustomHomeComponent;
