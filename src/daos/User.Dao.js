import { User } from "../models/UserMongoose.js";

export class userDao {
    async create(userData){
        /* userData.password = hash(userData.password) */
        return await User.create(userData).lean()
    }
    async readOne(query){
        /* const user = await User.findOne({ email: username }).lean()
        if(!user){
            throw new Error('Login failed')
        }
        if(!compareHash(password, user['password'])){
            throw new Error('Login failed')
        }
        return user */
        const user = await User.findOne(query).lean()
        if(!user){
            throw new Error('User Not Found')
        }
        return user
    }
    async readMany(query){
        return await User.find(query).lean()
    }
    async updateOne(query){
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
        const updated = await User.findOneAndUpdate(query, newData, { new: true }).lean()
        if(!updated){
            throw new Error('User Not Found')
        }
        return updated
    }
    async deleteOne(query){
        const deleted = await User.findOneAndDelete(query).lean()
        if(!deleted){
            throw new Error('User Not Found')
        }
        return deleted
    }
}




