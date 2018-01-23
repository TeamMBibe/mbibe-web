import React, { Component } from "react";
import { observer } from "mobx-react";
import AWS from "aws-sdk"
import userStore from '../../data_stores/UserStore'


const AreaCustomization = observer(class AreaCustomization extends Component {

  constructor(props) {
    super(props);
  }

  getMainStyle() {
    const bgColor = (userStore.businessObject.Style.M.BackgroundColor) ? userStore.businessObject.Style.M.BackgroundColor.S : "#FFAD0A"
    const fontColor = (userStore.businessObject.Style.M.FontColor) ? userStore.businessObject.Style.M.FontColor.S : "#000000"

    return ({backgroundColor:bgColor, color: fontColor, height:'auto', minHeight:'100vh', width:'100%'});
  }

  getBackgroundStyle(dynamoStyleObject) {
    const bgColor = (dynamoStyleObject.M.BackgroundColor) ? dynamoStyleObject.M.BackgroundColor.S : "#FFFFFF"

    return ({backgroundColor:bgColor});
  }

  getFontStyle(dynamoStyleObject) {
    const fontColor = (dynamoStyleObject.M.FontColor) ? dynamoStyleObject.M.FontColor.S : "#000000"

    return ({color:fontColor});
  }



});

const areaCustomization = new AreaCustomization();
export default areaCustomization;
