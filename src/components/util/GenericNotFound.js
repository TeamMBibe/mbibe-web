import React, { Component } from 'react';
import { observer } from "mobx-react";

const GenericNotFound = observer(class GenericNotFound extends Component {

    render() {
        return (
            <div>
                Page not found
            </div>
        );
    }
});


export default GenericNotFound;
