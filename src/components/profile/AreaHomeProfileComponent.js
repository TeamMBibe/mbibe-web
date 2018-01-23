import React, { Component } from 'react';
import { observer } from "mobx-react";
import headerStore from '../../data_stores/HeaderStore'
import userStore from '../../data_stores/UserStore'
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import areaCustomization from '../util/AreaCustomization'

const AreaHomeProfileComponent = observer(class AreaHomeProfileComponent extends Component {

    constructor(props) {
      super(props)
    }

    handleCardHover = (event) => {
        event.stopPropagation();
    }

    renderAdvertisements() {
      if(!userStore.businessObject.Advertisements) return;

      return userStore.businessObject.Advertisements.L.map((item) => {
        const cardBackStyle = areaCustomization.getBackgroundStyle(item.M.Style);
        const cardFontStyle = areaCustomization.getFontStyle(item.M.Style);
        return (
          <ListItem>
            <Card style={cardBackStyle} onMouseOver={this.handleCardHover} zDepth={2}>
              <CardTitle title={item.M.Title.S} titleStyle={cardFontStyle} />
              <CardText style={cardFontStyle}>
                {item.M.Content.S}
              </CardText>
            </Card>
          </ListItem>
        )
      })
    }

    render() {
        return (
            <div>
              <List>
                {this.renderAdvertisements()}
              </List>
            </div>
        );
    }
});


export default AreaHomeProfileComponent;
