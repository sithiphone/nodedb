var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


//router for create user
router.post('/register', userController.register);

module.exports = router;