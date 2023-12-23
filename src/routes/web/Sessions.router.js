import { Router } from "express";
import { userManager } from "../../models/UserMongoose.js";

export const sessionsRouter = Router()

sessionsRouter.get('/login', function loginView(req, res){
    res.render('login', {
        title: 'Login',
        style: 'form.css'
    })
})

sessionsRouter.post('/login', async (req, res) => {
    try{
        const { mail, password } = req.body
        let userData
        if(mail === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            userData = {
                mail: 'admin',
                username: 'admin',
                role: 'admin'
            }
        }
        else{
            const user = await userManager.findOne({ mail }).lean()
            if(!user){
                return res.redirect('/login')
            }
            if(password !== user.password){
                return res.redirect('/login')
            }
            userData = {
                mail: user.mail,
                username: user.username,
                role: 'user'
            }
        }
        req.session['user'] = userData
        res.redirect('/products')
    }
    catch(error){
        res.redirect('/login')
    }
})

sessionsRouter.post('/logout', (req, res) => {
    req.session.destroy(error => {
        res.redirect('/login')
    })
})
