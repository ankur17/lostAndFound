var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var request = require('request');

module.exports = {
    setup: function(authorize) {
        var passport = require('passport');
        passport.serializeUser(function(user, done) {
            done(null, JSON.stringify(user));
        });

        passport.deserializeUser(function(user, done) {
            done(null, user ? JSON.parse(user) : null);
        });

        passport.use(new GoogleStrategy({
                clientID: _config.googleAuth.clientID,
                clientSecret: _config.googleAuth.clientSecret,
                callbackURL: _config.googleAuth.callbackURL
            },
            function(token, tokenSecret, profile, done) {
                var email = profile.emails[0].value;
                var user_name = email.replace(/@[\s\S]*/, '');
                var user = {
                    'email': email,
                    'full_name': profile.displayName,
                    'photo': profile.photos.length > 0 ? profile.photos[0].value : '',
                };

                authorize(user,function(err,user){
                    if( err ){
                      done('Authorization Error');
                    }else{
                      done(null, user);
                    }
                });
            }
        ));

        return passport;
    }
};
