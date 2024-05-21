var express = require('express');
var router = express.Router();
var traineeController = require('../controllers/traineeController');

//router for get all trainees
router.get('/', traineeController.getAllTrainees);

module.exports = router;