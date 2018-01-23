import React, { Component } from 'react';

class GeneralUtils extends React.Component {

  getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    return (mm + '-' + dd + '-' + yyyy);
  }

};

const generalUtils = new GeneralUtils();
export default generalUtils;
