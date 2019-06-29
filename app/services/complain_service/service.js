var admin = require("firebase-admin");
var utils = require("./utils");

var db = admin.database();
var complainRef = db.ref("/complain");
var complainStackRef =  db.ref("/stack/complains");
var policeAvailableRef = db.ref("/police");


module.exports = {
    register :  function(user, callback) {
        // here user is Owner

        let complainId = utils.generateOrderedId();
        policeAvailableRef.child("available").orderByKey().limitToFirst(1).once("value",function(snapshot) {

            var availablePolice = snapshot.val();

            if( availablePolice ){

                let key = Object.keys(availablePolice)[0];
                availablePolice = availablePolice[key]
                let timestamp  = Date.now();
                let complainData = {
                    complainId : complainId,
                    ...availablePolice,
                    ...user,
                    assigned_timestamp : timestamp,
                    register_timestamp : timestamp
                }


                policeAvailableRef.child("available").child(key).set(null,function (err) {

                    if(err){
                        callback("ERROR to delete available",null)
                    } else {

                        policeAvailableRef.child("duty").child(key).set(availablePolice,function (err) {
                            complainRef.child(complainId).set(complainData,function (err) {
                                if(err){
                                    callback("ERROR Hai",null)
                                }else {
                                    callback(null,complainData);
                                }
                            })
                        })
                    }

                })

            }else{

                // no police available to serve
                // PUT in stack

                let complainData = {
                    complainId : complainId,
                    ...user,
                    register_timestamp : timestamp
                }

                complainStackRef.child(complainId).set(complainData,function (err) {
                    callback(null,complainData);
                })

            }
        });

    },


    solve : function (data,callback) {
        // here user is Police
        //

        let user = data.user
        let complain = data.complain

        if(user.type != "police"){
            callback("ONLY POLICE CAN DO IT",null)
        }

        complainRef.child(complain.complainId).set(null,function (error) {
            if(error){
                callback("COMPAIN RESOLUTION FAILED")
            } else {

                let complainDtata = {
                    userId : user.userId,
                    status : "available"
                }

                policeAvailableRef.child("available").child(user.userId).set(complainDtata,function (err) {

                    if(err){
                        callback("COMPLAIN RESOLUTION FAILED")
                    } else {
                        callback(null,true)
                    }
                })
            }

        })

    }
};
