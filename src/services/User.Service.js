import { userDao } from "../daos/index.js";
import { hash, compareHash } from "../utils/crypt.js";
import { cartDao } from "../daos/index.js";
import { AuthError } from "../models/errors/auth.error.js";

class userService{
    async create(userData){
        userData.password = hash(userData.password)
        const user = await userDao.create(userData)
        await cartDao.create(user.cartId)
        return user
    }
    async readOne(username, password){
        const user = await userDao.readOne(username)
        if(!compareHash(password, user['password'])){
            throw new AuthError()
        }
        return user
    }
    async readMany(query){
        return await userDao.readMany(query)
    }
    async updateOne(email, password){
        const newPass = hash(password)
        const updated = await userDao.updateOne(
            { email },
            { $set: { password: newPass } },
            { new: true }
        )
        if(!updated){
            throw new AuthError()
        }
        return updated
    }
    async deleteOne(query){
        return await userDao.deleteOne(query)
    }
}

export const service = new userService()

