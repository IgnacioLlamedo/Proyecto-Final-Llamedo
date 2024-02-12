import { Router } from "express";
import { updateController } from "../../controllers/User.Controller.js";
import { logWeb } from "../../middlewares/auth.js";
import passport from "passport";
import { cartDao } from "../../daos/index.js";

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

