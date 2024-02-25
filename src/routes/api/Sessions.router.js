import { Router } from "express";
import passport from "passport";
import { logApi } from "../../middlewares/auth.js";

export const sessionsRouter = Router()

sessionsRouter.post('/', 
    passport.authenticate('login', {
        failWithError: true
    }),
    function(req, res){
        res.status(201).json({ status: 'success', payload: req.user })
    },
    function(error, req, res, next){
        res.status(401).json({ status: 'error', message: 'Login failed' })
    }
)

sessionsRouter.get('/current',
    logApi,
    function(req, res){
        return res.json(req.user)
    }
)

sessionsRouter.delete('/current', (req, res) => {
    req.logOut(error => {
        if(error){
            return res.status(500).json({ status: 'error', body: error })
        }
        res.json({ status: 'succes', message: 'Logout succesful'})
    })
})
