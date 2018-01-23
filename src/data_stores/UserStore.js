import React from 'react'
import {action, extendObservable} from "mobx";
import AWS from 'aws-sdk';
import config from "../config";

class UserStore {
    constructor() {

        extendObservable(this, {
            email: null,
            user: null,

            memberObject: null,
            businessObject: null,

            areaMenuObject: null,

            leaveArea() {
              this.businessObject = null;
              this.memberObject = null;
              localStorage.getItem('selectedAreaMemberProfile', null)
              localStorage.setItem('selectedArea', null)
            },

            signUserOut() {
              if(this.user) {
                this.user.signOut();
              }
            },
        });

    }
}

const userStore = new UserStore();
export default userStore;
