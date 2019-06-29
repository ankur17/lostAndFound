var admin = require("firebase-admin");
var utils = require("./utils");

var serviceAccount = require("../../../app/keys/policeInfo-firebase-adminsdk.json");
admin.initializeApp({
    databaseURL: "https://police-info.firebaseio.com",
    credential: admin.credential.cert(serviceAccount),
});

var db = admin.database();

var usersRef = db.ref("/private/users/");

var UserService = {
    authorize: function(user, callback) {
        var userKey = utils.strHash(user.email);
        usersRef.child(userKey).once("value",function(snapshot) {
            var myUser = snapshot.val();
            if( myUser ){
              callback(null,myUser);
            }else{
                // callback(null,null);
              UserService.create(user,callback);
            }
        });
    },
    create: function(user, callback) {
        var hash = utils.strHash(user.email);
        let encode = user.email.substring(0,user.email.lastIndexOf('.')).replace('@','_')+"-"+hash; // ankurhinshirts-#
        user.userId = encode;

        usersRef.child(encode).set(user, function(err) {
            if (err) {
                callback('Unexpected Error, Try Again', null);
            } else {
                callback(null, user);
            }
        });
    },

  }

module.exports = UserService;
