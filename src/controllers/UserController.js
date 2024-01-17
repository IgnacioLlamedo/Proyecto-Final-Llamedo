import { User } from "../models/UserMongoose.js";

export async function postController(req, res, next){
    const userData = req.body
    const user = await User.register(userData)
    res.status(201).json(user)
}

export async function getController(req, res, next){
    const userData = re.query
    const users = await User.list(userData)
    res.json(users)
}


