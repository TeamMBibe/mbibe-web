import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'

const BusinessGeneralInfoComponent = observer(class BusinessGeneralInfoComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              Present general business info here
            </div>
        );
    }
});

export default BusinessGeneralInfoComponent;
