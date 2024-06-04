var express = require('express');
var router = express.Router();
var { body } = require('express-validator');

const userController = require('../controllers/userController');


//router for create user
router.post('/register',[
    body('username').not().isEmpty().withMessage('Username is required'),
    body('password').not().isEmpty().withMessage('Password is required').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid')
], userController.register);

//router for login user
router.post('/login',[
    body('username').not().isEmpty().withMessage('Username is required'),
    body('password').not().isEmpty().withMessage('Password is required').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], userController.login);

module.exports = router;