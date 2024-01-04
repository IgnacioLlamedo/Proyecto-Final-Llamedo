import { Router } from "express";
import { userManager } from "../../models/UserMongoose.js";
import { logWeb } from "../../middlewares/auth.js";
import passport from "passport";

export const usersRouter = Router()

usersRouter.get('/register', function registerView(req, res) {
    res.render('register', {
        title: 'Register',
        style: 'form.css'
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
        title: 'Reset Password',
        style: 'form.css'
    })
})

usersRouter.post('/resetpass', async function resetPass(req, res){
    try {
        await userManager.resetPass(req.body,email, req.body.password)
        res.redirect('/login')
    }
    catch(error) {
        console.log(error)
        res.redirect('/resetpass')
    }
})

usersRouter.get('/profile', logWeb, function profileView(req, res){
    res.render('profile', {
        title: 'Profile',
        user: req.user,
        style: 'form.css'
    })
})

