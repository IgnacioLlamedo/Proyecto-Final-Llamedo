import { User } from "../models/User.Mongoose.js";

export class userDao {
    async create(userData){
        return await User.create(userData)
    }
    async readOne(query){
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




