import { Router } from "express";
import { User } from "../../models/UserMongoose.js";
import { logApi, adminPermission } from "../../middlewares/auth.js";
import passport from "passport";

export const usersRouter = Router()

usersRouter.post('/',
    passport.authenticate('register', {
        failWithError: true
    }),
    function(req, res){
        res.status(201).json({ status: 'succes', payload: req.user})
    },
    function(error, req, res, next){
        res.status(400).json({ status: 'error', message: error.message })
    }
)

usersRouter.get('/current', logApi, async (req, res) => {
    res.json({ status: 'succes', payload: req.user })
})

usersRouter.put('/', async function (req, res) {
    try{
        const updated = await User.resetPass(req.body.email, req.body.password)
        res.json({ status: 'succes', payload: updated })
    }
    catch(error){
        res.status(400).json({ status: 'error', message: error.message })
    }
})

usersRouter.get('/', adminPermission, async(req, res) => {
    const users = await User.find().lean()
    res.json({ status: 'succes', payload: users })
})
