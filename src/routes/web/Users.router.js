import { Router } from "express";
import { userManager } from "../../models/UserMongoose.js";
import { logWeb } from "../../middlewares/session.js";

export const usersRouter = Router()

usersRouter.get('/register', function registerView(req, res) {
    res.render('register', {
        title: 'Register',
        style: 'form.css'
    })
})

usersRouter.post('/register', async function registerUser(req, res){
    try{
        await userManager.create(req.body)
        res.redirect('/login')
    }
    catch(error){
        res.redirect('/register')
    }
})

usersRouter.get('/profile', logWeb, function profileView(req, res){
    res.render('profile', {
        title: 'Profile',
        user: req.session['user'],
        style: 'form.css'
    })
})

