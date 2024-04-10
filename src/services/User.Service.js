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
        const users = await userDao.readMany(query)
        const usersPublicInfo = []
        for (const user of users){
            const userInfo = {
                email: user.email,
                username: user.username,
                role: user.role
            }
            usersPublicInfo.push(userInfo)
        }
        return usersPublicInfo
    }
    async resetPass(email, password){
        const newPass = hash(password)
        const updated = await userDao.updateOne(email, {password: newPass})
        if(!updated){
            throw new AuthError()
        }
        return updated
    }
    async changeRole(email, newRole){
        const updated = await userDao.updateOne(email, {role: newRole})
        if(!updated){
            throw new AuthError()
        }
        return updated
    }
    async deleteOne(query){
        return await userDao.deleteOne(query)
    }
    //vvvvvvvvv
    async deleteMany(){

    }
    //^^^^^^^^^
}

export const service = new userService()

