/**
 * Created by ankur on 29/6/19.
 */


var cron = require('node-cron');
var admin = require("firebase-admin");
var serviceAccount = require("./key/firebase-admin-key.json");
import {automaticComplainAssign} from './functions';

admin.initializeApp({
    databaseURL: "https://police-info.firebaseio.com",
    credential: admin.credential.cert(serviceAccount),
});

var complainRef = db.ref("/complain");
var complainStackRef =  db.ref("/stack/complains");
var policeAvailableRef = db.ref("/police");


var db = admin.database();


cron.schedule('*/2 * * * *', () => {
    console.log('running a task every two minutes');
    automaticComplainAssign()

});
