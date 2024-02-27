import { User } from "../models/User.Mongoose.js";
import { AuthError } from "../models/errors/auth.error.js";

export class userDao {
    async create(userData){
        return await User.create(userData)
    }
    async readOne(query){
        const user = await User.findOne({ email: query }).lean()
        if(!user){
            throw new AuthError()
        }
        return user
    }
    async readMany(query){
        return await User.find(query).lean()
    }
    async updateOne(query){
        const updated = await User.findOneAndUpdate({ email: query }, newData, { new: true }).lean()
        if(!updated){
            throw new AuthError()
        }
        return updated
    }
    async deleteOne(query){
        const deleted = await User.findOneAndDelete({ email: query }).lean()
        if(!deleted){
            throw new AuthError()
        }
        return deleted
    }
}




