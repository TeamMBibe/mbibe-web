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
              localStorage.getItem('selectedBusinessMemberProfile', null)
              localStorage.setItem('selectedBusiness', null)
            },

            signUserOut() {
              if(this.user) {
                this.user.signOut();
                localStorage.getItem('selectedBusinessMemberProfile', null)
                localStorage.setItem('selectedBusiness', null)
              }
            },
        });

    }
}

const userStore = new UserStore();
export default userStore;
