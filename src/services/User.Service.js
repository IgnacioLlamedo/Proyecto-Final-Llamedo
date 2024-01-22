import { userDao } from "../daos/index.js";
import { randomUUID } from "node:crypto"

import class userService{
    async create(){
        /* userData.password = hash(userData.password) */
    }
    async readOne(){
        /* const user = await User.findOne({ email: username }).lean()
        if(!user){
            throw new Error('Login failed')
        }
        if(!compareHash(password, user['password'])){
            throw new Error('Login failed')
        }
        return user */
    }
    async updateOne(){
        /* const newPass = hash(password)
        const updated = await User.findOneAndUpdate(
            { email },
            { $set: { password: newPass } },
            { new: true }
        ).lean()
        if(!updated){
            throw new Error('Failed resetting password')
        }
        return updated */
    }
}



