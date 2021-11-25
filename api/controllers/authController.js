//const userModel = require('../models/userModel');// force: true will drop the table if it already exists
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async function (req, res, next) {
    passport.authenticate('register', {
        session: false
    },  (err, user) => {
            if(err){
                res.status(400).json({
                    message: 'Registration error',
                    error: err
                });
                return;
            }
            res.json({
                message: 'Registration successful',
                data: {
                    'email': user.email,
                }
            });
        }
    )(req, res, next)
};

exports.login = async function (req, res, next) {
    passport.authenticate('login',
        async (err, user, info) => {
            try {
                if (err) {
                    const error = new Error('An error occurred.');
                    return next(error);
                }
                
                if (!user) {
                    res.status(404).json({
                        message: info["message"],
                        data: null
                    });
                    return;
                }

                req.login(
                    user, {
                        session: false
                    },
                    async (error) => {
                        if (error) return next(error);

                        const body = {
                            id: user.id,
                            email: user.email,
                            userRole: user.userRole,
                        };
                        //console.log("user.id", user.id)
                        const token = jwt.sign({ user: body }, process.env.API_KEY, { expiresIn: '1h' });
                        //res.cookie('capital',token,{maxAge:9000000,httpOnly:true});
                        //res.cookie('jwt',token,{maxAge:9000000,httpOnly:true});
                        return res.json({
                            message: "Login successful",
                            data: {
                                'jwt': token,
                                'user':{
                                    'email': user.email,
                                    'displayName': user.displayName,
                                    'id': user.id,
                                    'userRole': user.userRole,
                                }
                            }
                        });
                    }
                );
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
};