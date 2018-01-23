import React from 'react'
import {action, extendObservable} from "mobx";

class HeaderStore {
    constructor() {

        extendObservable(this, {
            drawerOpen: false,
            headerTitle: "Untitled",

            updateDrawerStatus (isOpenStatus) {
                this.drawerOpen = isOpenStatus;
            },

            updateHeaderTitle (title) {
                this.headerTitle = title;
            },

            forceDrawerClose () {
                if(this.drawerOpen) this.drawerOpen = false;
            },

        });

    }
}

const headerStore = new HeaderStore();
export default headerStore;
