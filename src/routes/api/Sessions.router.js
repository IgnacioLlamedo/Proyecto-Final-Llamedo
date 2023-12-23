import { Router } from "express";
import { userManager } from "../../models/UserMongoose.js";

export const sessionsRouter = Router()

sessionsRouter.post('/', async (req, res) => {
    const { mail, password } = req.body
    let userData
    if(mail === 'adminCoder@coder.com' && password === 'adminCod3r123'){
        userData = {
            mail: 'admin',
            userName: 'admin',
            role: 'admin'
        }
    }
    else{
        const user = await userManager.findOne({ mail }).lean()
        if(!user){
            return res.status(400).json({ status: 'error', message: 'login failed' })
        }
        if(password !== user.password){
            return res.status(400).json({ status: 'error', message: 'login failed' })
        }
        userData = {
            mail: user.mail,
            username: user.username,
            role: 'user'
        }
        req.session['user'] = userData
        res.status(201).json({ status: 'succes', message: 'login succesful'})
    }
})

sessionsRouter.get('/current', (req, res) => {
    if(req.session['user']){
        return res.json(req.session['user'])
    }
    return res.status(400).json({ status: 'error', message: 'session not found' })
})

sessionsRouter.delete('/current', (req, res) => {
    req.session.destroy(error => {
        if(error){
            return res.status(500).json({ status: 'logout error', body: error})
        }
        res.status(201).json({ status: 'succes', message: 'logut succesful' })
    })
})



