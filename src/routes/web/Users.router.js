import { Router } from "express";
import { updateController, getAdminUsers } from "../../controllers/User.Controller.js";
import { logWeb } from "../../middlewares/auth.js";
import passport from "passport";

export const usersRouter = Router()

usersRouter.get('/register', function registerView(req, res) {
    res.render('register', {
        title: 'Register'
    })
})

usersRouter.post('/register',
    passport.authenticate('register', {
        successRedirect: '/profile',
        failureRedirect: '/register'
    })
)

usersRouter.get('/resetpass', function resetPassView(req, res){
    res.render('resetpass', {
        title: 'Reset Password'
    })
})

usersRouter.post('/resetpass', updateController)

usersRouter.get('/profile', logWeb, function profileView(req, res){
    res.render('profile', {
        title: 'Profile',
        user: req.user
    })
})

usersRouter.get('/users', getAdminUsers)

