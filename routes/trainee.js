var express = require('express');
var router = express.Router();
var traineeController = require('../controllers/traineeController');

//router for get all trainees
router.get('/', traineeController.getAllTrainees);
//router for create trainee
router.post('/', traineeController.createTrainee);

module.exports = router;