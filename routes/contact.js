var express = require('express');
var router = express.Router();
var contactController = require('../controllers/contact.js');
var runvalidation = require('../validators/index.js').runvalidation;
var check = require('express-validator').check;
var authController = require('../controllers/auth.js');

var usersigninvalidator = [check('email').isEmail().withMessage('Must be a valid email address')];

router.post('/contact', usersigninvalidator, runvalidation, contactController.contact);

router.get('/get-contacts', authController.requireSignin, authController.adminMiddleware, contactController.getcontacts);

router.delete('/contact/delete/:id', authController.requireSignin, authController.adminMiddleware, contactController.DeleteContact);

module.exports = router;
