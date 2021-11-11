const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const auth = require('../tools/auth');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const povprasevanjeController = require('../controllers/povprasevanjeController');
const placnikController = require('../controllers/placnikController');

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
    .get(userController.get)
    .put(userController.put)
    .patch(userController.patch)
    .delete(userController.delete);  

router.route('/register')
    .post(authController.register);

router.route('/login')
    .post(authController.login);

router.route('/povprasevanja')
    .get(povprasevanjeController.getAll)
    .post(povprasevanjeController.post);
router.route('/povprasevanja/:povprasevanjeID')
    .get(povprasevanjeController.get)
    .put(povprasevanjeController.put)
    .patch(povprasevanjeController.patch)
    .delete(povprasevanjeController.delete);
router.route('/placniki')
    .post(placnikController.post)
    .get(placnikController.getAll);
router.route('/placniki/:placnikID')
    .get(placnikController.get)
    .put(placnikController.put)
    .patch(placnikController.patch)
    .delete(placnikController.delete);
/*
router.route('/profile')
    .get(passport.authenticate('jwt', {
            session: false
        }),
        (req, res, next) => {
            res.json({
                message: 'You made it to the secure route',
                user: req.user,
                token: req.query.secret_token
            })
        }
    );

router.route('/users')
    .post(userController.new)
    .get(userController.view);
router.route('/users/:id')
    .get(userController.find)
    .put(userController.update)
    .patch(userController.update)
    .delete(userController.delete);

router.route('/projects')
    .post(projectController.new)
    .get(projectController.viewAll);
router.route('/projects/:projectid')
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkProjectId, projectController.view)
    .put((req,res,next)     => authenticate(req,res,next), authTools.checkProjectId, projectController.update)
    .patch((req,res,next)   => authenticate(req,res,next), authTools.checkProjectId, projectController.update)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkProjectId, projectController.delete);

router.route('/projects/:projectid/users')
    .post(projectsUsersController.new)
    .get(projectsUsersController.viewAll)
    .delete(projectsUsersController.deleteMany);
router.route('/projects/:projectid/users/:userid')
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkId, projectsUsersController.view)
    .put((req,res,next)     => authenticate(req,res,next), authTools.checkId, projectsUsersController.update)
    .patch((req,res,next)   => authenticate(req,res,next), authTools.checkId, projectsUsersController.update)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, projectsUsersController.delete);

router.route('/projects/:projectid/posts')
    .post(postController.new)
    .get(postController.viewAll)
    .delete(postController.deleteMany);
router.route('/projects/:projectid/posts/:postid')
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkId, postController.view)
    .put((req,res,next)     => authenticate(req,res,next), authTools.checkId, postController.update)
    .patch((req,res,next)   => authenticate(req,res,next), authTools.checkId, postController.update)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, postController.delete);

router.route('/projects/:projectid/posts/:postid/comments')
    .post(commentController.new)
    .get(commentController.viewAll)
    .delete(commentController.deleteMany);
router.route('/projects/:projectid/posts/:postid/comments/:commentid')
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkId, commentController.view)
    .put((req,res,next)     => authenticate(req,res,next), authTools.checkId, commentController.update)
    .patch((req,res,next)   => authenticate(req,res,next), authTools.checkId, commentController.update)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, commentController.delete);

router.route('/projects/:projectid/sprints')
    .post(sprintController.new)
    .get(sprintController.viewAll)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, sprintController.deleteMany);
router.route('/projects/:projectid/sprints/:sprintid')
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkProjectId, sprintController.view)
    .put((req,res,next)     => authenticate(req,res,next), authTools.checkProjectId, sprintController.update)
    .patch((req,res,next)   => authenticate(req,res,next), authTools.checkProjectId, sprintController.update)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkProjectId, sprintController.delete);

router.route('/projects/:projectid/stories')
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkId, storyController.viewNotInSprint)

router.route('/projects/:projectid/sprints/:sprintid/stories')
    .post(storyController.new)
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkId, storyController.viewAll)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, storyController.deleteMany);
router.route('/projects/:projectid/sprints/:sprintid/stories/:storyid')
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkId, storyController.view)
    .put((req,res,next)     => authenticate(req,res,next), authTools.checkId, storyController.update)
    .patch((req,res,next)   => authenticate(req,res,next), authTools.checkId, storyController.update)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, storyController.delete);
router.route('/projects/:projectid/sprints/:sprintid/stories/:storyid/notes')
    .get(storyNoteController.viewAll)
    .post(storyNoteController.new)
    .delete(storyNoteController.deleteMany);
router.route('/projects/:projectid/sprints/:sprintid/stories/:storyid/notes/:noteid')
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, storyNoteController.delete);

router.route('/projects/:projectid/sprints/:sprintid/stories/:storyid/tasks')
    .post(taskController.new)
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkId, taskController.viewAll)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, taskController.deleteMany);
router.route('/projects/:projectid/sprints/:sprintid/stories/:storyid/tasks/:taskid')
    .get((req,res,next)     => authenticate(req,res,next), authTools.checkId, taskController.view)
    .put((req,res,next)     => authenticate(req,res,next), authTools.checkId, taskController.update)
    .patch((req,res,next)   => authenticate(req,res,next), authTools.checkId, taskController.update)
    .delete((req,res,next)  => authenticate(req,res,next), authTools.checkId, taskController.delete);

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
