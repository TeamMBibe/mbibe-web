import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react";
import { withRouter } from 'react-router'
import MobileHeader from "../../components/util/MobileHeader"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MobileLoginPage = observer(class MobileLoginPage extends Component {

    render() {

        return (
            <div>
                <MuiThemeProvider>
                    <MobileHeader />
                </ MuiThemeProvider>
            </div>
        );
    }
});
    
    
    
export default MobileLoginPage;
