var db = require('../db');
var Trainee = require('../models/trainee');
var saveImage = require('../controllers/uploadImangeController');

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
        photo = await saveImage.saveImage(req.body.photo);
        
        const t = new Trainee(gender, first_name, last_name, score);
        const q = 'INSERT INTO trainees (gender, first_name, last_name, score, photo) VALUES (?, ?, ?, ?, ?)';
        db.query(q, [t.gender, t.first_name, t.last_name, t.score, photo], (err, result) => {
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

// update trainee
exports.updateTrainee = async (req, res) => {
    const id  = req.params.id;
    // print req.body to see what is being sent
    //console.log(req.body);
    const q = 'Update trainees set gender=?, first_name=?, last_name=?, score=? where id=?';
    db.query(q, [req.body.gender, req.body.first_name, req.body.last_name, req.body.score, id] ,
         (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR',
                message: err.message
            });
        }
        return res.status(200).json({ message: 'Trainee updated successfully' });
    } );
}


exports.deleteTrainee = async (req, res) => {
    const id  = req.params.id;
    const q = 'Delete from trainees where id=?';
    db.query(q, [id] ,
         (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR',
                message: err.message
            });
        }else{
            return res.status(200).json({ message: 'Trainee deleted successfully' });
        }
    } );
}


// get trainee by id
exports.getTraineeById = async (req, res) => {
    const id  = req.params.id;
    const q = 'select * from trainees where id=?';
    db.query(q, [id] ,
         (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR',
                message: err.message
            });
        }else{
            return res.status(200).json({ data: result });
        }
    } );
}
