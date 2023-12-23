import { Router } from "express";
import { userManager } from "../../models/UserMongoose.js";
import { logApi } from "../../middlewares/session.js";

export const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
    try{
        const user = await userManager.create(req.body)
        res.status(201).json({ status: 'succes', payload: user})
    }
    catch (error){
        res.status(400).json({ status: 'error', message: error.message })
    }
})

usersRouter.get('/current', logApi, async (req, res) => {
    const user = await userManager.findOne({ mail: req.session['user'].mail }, { password: 0}).lean()
    res.json({ status: 'succes', payload: user })
})



