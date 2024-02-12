import { Cart } from "../models/Cart.Mongoose.js";

export class cartDao {
    async create(cid){
        const data = {
            _id: cid
        }
        const cart = await Cart.create(data)
        return cart.toObject()
    }
    async readOne(query){
        const cart = await Cart.findOne({ _id: query }).lean()
        if(!cart){
            throw new Error('Cart Not Found')
        }
        return cart
    }
    async readMany(query){
        return await Cart.find(query).lean()
    }
    async updateOne(query, newData){
        const updated = await Cart.findOneAndUpdate({ _id: query }, newData, { new: true }).lean()
        if(!updated){
            throw new Error('Cart Not Found')
        }
        return updated
    }
    async deleteOne(query){
        const deleted = await Cart.findOneAndDelete({ _id: query }).lean()
        if(!deleted){
            throw new Error('Cart Not Found')
        }
        return deleted
    }
    async populate(query){
        const cart = await Cart.find( query )
        if(!cart){
            throw new Error('Cart Not Found')
        }
        return cart
    }
}





