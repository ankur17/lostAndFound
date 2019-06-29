var express = require('express');
var router = express.Router();
var controller = require('./controller');


router.get('/test',controller.testController)
router.get('/complain/register',_auth_login,controller.complainRegister); // by the owner
router.get('/complain/resolve',_auth_login,controller.complainSolve);  // by police






module.exports = router;
