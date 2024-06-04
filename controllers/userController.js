var User = require('../models/user');
var db = require('../db');
var jwt = require('jsonwebtoken');
var { validationResult } = require('express-validator');

//function for register new user
exports.register = async (req, res, next) => {
    try{
        let { username, password, email} = req.body;
        let user = new User(username, password, email);
        user.password = await user.hashPassword(user.password);
        
        var errors = validationResult(req);
        if(!errors.isEmpty()){
            error = new Error('ປ້ອນຂໍ້ມູນເຂົ້າບໍ່ຖືກ');
            error.statusCode = 400;
            error.validation = errors.array();
            return next(error);
        }
        
        //check if user already exists
        const check = 'SELECT * FROM users WHERE username = ?';
        db.query(check, [user.username], (err, result) => {
            if(err) return next(err);
            if(!result.length > 0){
                const q = 'INSERT INTO users (username, password, email, role) values(?, ?, ?, ?)';
                db.query(q,[user.username, user.password, user.email, user.role] , (err, result) => {
                    if(err) throw err;
                    res.status(201).send('User registered successfully');
                });
            }else{
                err = new Error('User already exists');
                err.status = 409;
                return next(err);
            }
        });
    }catch(err){
        return next(err);
    }
}

//function for login user
exports.login = async (req, res, next) => {
    try{
        let { username, password } = req.body;
        db.query(`select username, password from users where username = ?`, [username], async (err, result) => {
            if(err) return next(err);
            if(result.length > 0){
                let user = new User(result[0].username, result[0].password);
                let compare = await user.comparePassword(password);
                if(!compare){
                    err = new Error('Invalid password');
                    err.status = 401;
                    return next(err);
                }else{
                    let token = jwt.sign({
                        username: user.username,
                        role: user.role
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1h'
                    });
                    
                    let express_in = jwt.decode(token);
                    return res.status(200).json({
                        token: token,
                        express_in: express_in.exp
                    });
                }
            }else{
                err = new Error('User not found');
                err.status = 404;
                return next(err);
            }
        }
    );      
    }catch(err){
        return next(err);
    }
}