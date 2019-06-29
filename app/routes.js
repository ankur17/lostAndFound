var controllers = require(_dir.DIR_CONTROLLERS);
var express = require('express');

module.exports = function(app, passport) {
    app.use('/dist', require('compression')(), express.static(__dirname + '/dist'));
    app.use('/src', express.static(__dirname + '/src', { maxAge: 10000 }));

    // google auth routes
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        function(req, res) {
            res.redirect('/');
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });




    app.get('/',(req, res)=>{
        // res.redirect('/view');
        if (req.isAuthenticated()) {
            res.redirect('/view#/home');
        } else {
            res.render('login');
        }
    });




    // app.post('/internal/response/:matchid',(req,res)=>{
    //   res.send({msg:"got the post response"});
    //   console.log("Got the response!! ");
    // });




    // app.post('/internal/response/:matchid',controllers. });

    app.use('/view', controllers.UIController);
    app.use('/ajax', controllers.AjaxController);

    app.get("/health", function(req, res) {
        res.send("Application is up and running!!");
    });

    app.get("/robots.txt", function(req, res) {
        res.send("User-agent: *\nDisallow: /");
    });

    app.get("/*", function(req, res) {
        res.send("Path doesn't exist");
    });
};
