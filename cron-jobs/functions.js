/**
 * Created by ankur on 13/6/19.
 */


var cron = require('node-cron');
var admin = require("firebase-admin");
var serviceAccount = require("./key/firebase-admin-key.json");

admin.initializeApp({
    databaseURL: "https://police-info.firebaseio.com",
    credential: admin.credential.cert(serviceAccount),
});

var complainRef = db.ref("/complain");
var complainStackRef =  db.ref("/stack/complains");
var policeAvailableRef = db.ref("/police");


var db = admin.database();



const automaticComplainAssign = ()=>{
    policeAvailableRef.child("available").orderByKey().limitToFirst(1).once("value",function(snapshot) {
        let availablePolice = snapshot.val()
        if(availablePolice){

            let noOfPoliceAvaibale = Object.keys(availablePolice).length;


            complainStackRef.orderByKey().limitToFirst(noOfPoliceAvaibale).once("value",function(complain_snap){

                let complain_snap = complain_snap.val()


                let key = Object.keys(availablePolice)[0];
                let availablePolice = availablePolice[key]
                let timestamp  = Date.now();
                let complainData = {
                    complainId : complainId,
                    ...availablePolice,
                    ...user,
                    assigned_timestamp : timestamp,
                }

                if(complain_snap){
                    // ready add to compains now

                    complainRef.child(complainId).set(complainData,function (err) {
                        if(err){
                            callback("ERROR Hai",null)
                        }else {
                            callback(null,complainData);
                        }
                    })


                }

            })



        }
    })
}


const OffDutyPolice = ()=>{

}

cron.schedule('*/2 * * * *', () => {
    console.log('running a task every two minutes');
    automaticComplainAssign()

});





