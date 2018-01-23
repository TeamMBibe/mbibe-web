import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import MediaQuery from 'react-responsive';
import { withRouter, Redirect } from 'react-router'

const ProfilePage = observer(class ProfilePage extends Component {

    render() {
        return (
            <div>
              This is the profile page
            </div>
        );
    }
});


export default ProfilePage;
