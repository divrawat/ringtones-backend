var express = require("express");
var router = express.Router();
var authController = require("../controllers/auth");
var runvalidation = require("../validators/index").runvalidation;
var check = require("express-validator").check;

var usersigninvalidator = [check('email').isEmail().withMessage('Must be a valid email address')];

router.post('/login', usersigninvalidator, runvalidation, authController.login);
router.get('/admin-signout', authController.signout);

module.exports = router;
