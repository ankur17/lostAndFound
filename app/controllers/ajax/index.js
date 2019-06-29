var express = require('express');
var router = express.Router();
var controller = require('./controller');


router.get('/test',controller.testController)
router.get('/complain/register',controller.complainRegister); // by the owner
router.get('/complain/resolve',controller.complainSolve);  // by police






module.exports = router;
