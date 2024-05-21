var db = require('../db');
var {trainee} = require('../models/trainee');

// Get all trainees
exports.getAllTrainees = (req, res) => {
    try{
        const q = 'select * from trainees';
        db.query(q, (err, result) => {
            return res.status(200).json({data: result});
        });
    }catch(error){
        return res.status(500).json({
            status: 'INTERVAL_SERVER_ERROR',
            message: error.message
        });
    }
}