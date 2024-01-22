import { User } from "../models/UserMongoose.js";

export async function postController(req, res, next){
    const userData = req.body
    const user = await User.register(userData)
    res.status(201).json(user)
}

export async function getController(req, res, next){
    const query = req.query
    const users = await User.list(query)
    res.json(users)
}

export async function updateController(req, res, next){
    const updated = await User.resetPass(req.body.email, req.body.password)
    res.status(201).json(updated)

}

export async function getCurrentController(req, res, next){
    const current = req.user
    return current
}
