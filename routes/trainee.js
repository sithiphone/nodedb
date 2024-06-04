var express = require('express');
var router = express.Router();
var traineeController = require('../controllers/traineeController');
var passportJWT = require('../middleware/passportJWT');

router.get('/', [passportJWT.IsLoggedIn], traineeController.getAllTrainees);

//router for get all trainees
// router.get('/', traineeController.getAllTrainees);
//router for create trainee
router.post('/', traineeController.createTrainee);
//router for update trainee
router.put('/:id', traineeController.updateTrainee);
//delete trainee
router.delete('/:id', traineeController.deleteTrainee);
module.exports = router;