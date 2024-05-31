var User = require('../models/user');
var db = require('../db');

//function for register new user
exports.register = async (req, res) => {
    try{
        let { username, password, email} = req.body;
        let user = new User(username, password, email);
        user.password = await user.hashPassword(user.password);
        const q = 'INSERT INTO users (username, password, email, role) values(?, ?, ?, ?)';
        db.query(q,[user.username, user.password, user.email, user.role] , (err, result) => {
            if(err) throw err;
            res.status(201).send('User registered successfully');
        });
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}