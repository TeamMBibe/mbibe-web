import React from 'react'
import {action, extendObservable} from "mobx";

class HeaderStore {
    constructor() {

        extendObservable(this, {
            drawerOpen: false,

            updateDrawerStatus (isOpenStatus) {
                this.drawerOpen = isOpenStatus;
            },

            forceDrawerClose () {
                if(this.drawerOpen) this.drawerOpen = false;
            },

        });

    }
}

const headerStore = new HeaderStore();
export default headerStore;