import React, { Component } from "react";
import { observer } from "mobx-react";
import AWS from "aws-sdk"
import generalUtils from '../util/GeneralUtils'


const BusinessManagement = observer(class BusinessManagement extends Component {

  constructor(props) {
    super(props);

    //this.props.userStore = new userStore();
    this.state = {
      USER_POOL_ID: "us-east-2_SVtG899jG",
      APP_CLIENT_ID: "2e1u1rr6k358jdf4j165kn4fu4",
      TEST_ID_POOL: 'us-east-2:58b685bb-94ef-40cf-b474-c11cc51d4f5a'
    }

    // Setup credentials and region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this.state.TEST_ID_POOL
    });
    AWS.config.region = 'us-east-2'

    this.ddb = new AWS.DynamoDB({region: 'us-east-2'});
    this.docClient = new AWS.DynamoDB.DocumentClient();
    this.uuid = null;
  }

  getBusinessesWithGeoLocations() {
        var params = {
            TableName : "business-table",
            AttributesToGet: ["business_uuid", "business_name", "geo_location"]
        };

        return new Promise((resolve, reject) => {
            this.ddb.scan(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    reject(err);
                } else {
                  const areas = data.Items.map(function(item) {
                    return ({
                      businessName: item.business_name.S,
                      businessUUID: item.business_uuid.S,
                      latitude: parseFloat(item.geo_location.M.latitude.S),
                      longitude: parseFloat(item.geo_location.M.longitude.S)
                    })
                  })
                  resolve(areas);
                }
            })
        });
    }

  getBusiness(uuid) {
        var params = {
            TableName : "business-table",
            KeyConditionExpression: "business_uuid = :n",
            ExpressionAttributeValues: {
                ":n": { S:uuid }
            }
        };

        return new Promise((resolve, reject) => {
            this.ddb.query(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    reject(err);
                } else {
                    console.log(data.Items[0]);
                    if(data.Items.length > 0) resolve(data.Items[0])
                    else resolve()
                }
            })
        });
    }

    getMemberProfileForBusiness(uuid, username) {
          var params = {
              "TableName" : uuid,
              "KeyConditionExpression": "username = :n",
              "ExpressionAttributeValues": {
                  ":n": { S:username }
              }
          };

          return new Promise((resolve, reject) => {
              this.ddb.query(params, function(err, data) {
                  if (err) {
                      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                      reject(err);
                  } else {
                    console.log(data.Items);
                    if(data.Items.length > 0) resolve(data.Items[0])
                    else resolve(null)
                  }
              })
          });
      }

      getBusinessMenus(uuid) {
            var params = {
                "TableName" : "business-table",
                "AttributesToGet": ["business_menus"],
                "KeyConditionExpression": "business_uuid = :n",
                "ExpressionAttributeValues": {
                    ":n": { S:uuid }
                }
            };

            return new Promise((resolve, reject) => {
                this.ddb.query(params, function(err, data) {
                    if (err) {
                        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                        reject(err);
                    } else {
                      console.log(data.Items);
                      if(data.Items.length > 0) resolve(data.Items[0])
                      else resolve(null);
                    }
                })
            });
        }

      addMemberToBusiness(uuid, username) {
        const date = generalUtils.getCurrentDate();
        var params = {
            "TableName" : uuid,
            "Item" : {
              'username' : {'S' : username },
              'member_since' : { 'S' : date},
              "points": {"N": "0"}
            }
        };

        return new Promise((resolve, reject) => {
            this.ddb.putItem(params, function(err, data) {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  console.log(data);
                  resolve();
                }
            })
        });
      }
});

const businessManagement = new BusinessManagement();
export default businessManagement;
