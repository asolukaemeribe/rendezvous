const AWS = require('aws-sdk')
const config = require('../aws.config.js')

export function connectToDynamoDB() {
    // update config to add access key
    AWS.config.update(config.aws_remote_config);
    const ddb = new AWS.DynamoDB()

    // Call DynamoDB to retrieve the list of tables
    ddb.listTables({Limit: 10}, function(err: Error, data: any) {
        if (err) {
        console.log("Error", err);
        } else {
        console.log("AWS VERSION: ", AWS.VERSION)
        console.log("Table names are ", data.TableNames);
        }
    });

    return ddb;
}

function refreshUserLocation(ddb: any) {
    const ddbGeo = require('dynamodb-geo');
    const config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'MyGeoTable')
}