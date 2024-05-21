var db = require('../db');
var Trainee = require('../models/trainee');

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

//Create trainee
exports.createTrainee = async (req, res) => {
    const { gender, first_name, last_name, score } = req.body;
    
    // Basic validation
    if (!gender || !first_name || !last_name || typeof score !== 'number') {
        return res.status(400).json({
            status: 'BAD_REQUEST',
            message: 'Missing or invalid required fields'
        });
    }
    var t = new Trainee(gender,first_name, last_name, score);
    try {
        // const t = new Trainee(gender, first_name, last_name, score);
        const q = 'INSERT INTO trainees (gender, first_name, last_name, score) VALUES (?, ?, ?, ?)';
        db.query(q, [t.gender, t.first_name, t.last_name, t.score], (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 'INTERNAL_SERVER_ERROR',
                    message: err.message
                });
            }
            return res.status(201).json({ message: 'Trainee created successfully' });
        });
    } catch (error) {
        return res.status(500).json({
            status: 'INTERNAL_SERVER_ERROR',
            message: error.message
        });
    }
};
