import { Router } from "express";
import { resetPassControllerWeb, getAdminUsers } from "../../controllers/User.Controller.js";
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
    if(req.user){
        res.render('resetpass', {
            title: 'Reset Password'
        })
    }
    else{
        res.redirect('/login')
    }
})

usersRouter.post('/resetpass', resetPassControllerWeb)

usersRouter.get('/profile', logWeb, function profileView(req, res){
    if(req.user){
        res.render('profile', {
            title: 'Profile',
            user: req.user
        })
    }
    else{
        res.redirect('/login')
    }
})

usersRouter.get('/users', getAdminUsers)

