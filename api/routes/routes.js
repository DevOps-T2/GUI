const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const auth = require('../tools/auth');
const userModel = require('../models/userModel');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to MICROSERVICES NODEJS API crafted with love!',
    });
});

router.route('/users')
    .post(userController.post)
    .get(userController.getAll);
 router.route('/users/:email')
    .get((req,res,next) => authenticate(req,res,next), (req,res,next) =>    checkId(req,res,next), userController.get)
    .put(userController.put)
    .patch(userController.patch)
    .delete(userController.delete);  

router.route('/register')
    .post(authController.register);

router.route('/login')
    .post(authController.login);

/*
router.route('/projects/:projectid/sprints/:sprintid/stories/:storyid/tasks/:taskid/taskUsers')
    .post(taskUserController.new)
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkId, taskUserController.viewAll)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, taskUserController.deleteMany);
router.route('/projects/:projectid/sprints/:sprintid/stories/:storyid/tasks/:taskid/taskUsers/:taskuserid')
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkId, taskUserController.view)
    .put((req,res,next)     => authenticate(req,res,next), authTools.checkId, taskUserController.update)
    .patch((req,res,next)   => authenticate(req,res,next), authTools.checkId, taskUserController.update)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, taskUserController.delete);
*/
module.exports = router;

function authenticate(req, res, next){

    //return next(); //TODO
    passport.authenticate('jwt', {session: false}, function (err, user, info){
        if(user){
            req.user = user;
            return next();
        } else {
            console.log("UNAUTHORIZED - JWT INVALID");
            res.json({
                message:'Unauthorized',
                data:""
            });
            return;
        }
    })(req, res, next)
}

function checkId(req, res, next, param) {
    userModel.findOne({email: req.params.email}, function (err, user) {
        if (err){
            next(err);
        }

        if (req.user.id == user._id || req.user.userRole == "admin"){
            return next();
        } else{
            res.status(403).json({
                message: 'Authentication failed',
                data: ""
            });
            return;
        }
    });
}
