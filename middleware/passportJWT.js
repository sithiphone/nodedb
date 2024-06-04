const cfg = require('../config/index');
const passport = require('passport');
var db = require('../db');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = cfg.JWT_SECRET;

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    try{
        db.query('SELECT username, role FROM users WHERE username = ?', [jwt_payload.username], (err, result) => {
            if(err) return done(err, false);
            if(result.length > 0){
                return done(null, result[0]);
            }else{
                return done(null, false);
            }
        });
    }catch(err){
        return done(err, false);
    }
}));

module.exports.IsLoggedIn = (req, res, next) => {
    try{
        passport.authenticate('jwt', {session: false}, (err, user) => {
            if(err ){
                return next(err);
            }
            if(!err){
                err = new Error('Unauthorized');
                err.statusCode = 401;
                return next(err);
            }
            req.user = user;
            return next();
        })(req, res, next);   
    }catch(err){
        return next(err);
    }
}