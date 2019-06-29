var request = require('request');
var services = require(_dir.DIR_SERVICES);
var fs = require('fs');
var fetch = require('node-fetch');
var UserService = services.UserService;
var ComplainService = services.ComplainService;


module.exports = {
    testController: function(req,res){
        res.send({ans : "This controller is really working"});
    },

    complainRegister : function (req,res) {

        ComplainService.register(user,(err,data)=>{
            res.send({
                err: err,
                data : data
            })
        })
    },

    complainSolve : function (req,res) {

        ComplainService.solve(data,(err,result)=>{
            res.send({
                err: err,
                result : result
            })
        })


    }

};
