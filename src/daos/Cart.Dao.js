import { Cart } from "../models/Cart.Mongoose.js";

export class cartDao {
    async create(){
        const cart = await Cart.create()
        return cart.toObject()
    }
    async readOne(query){
        const cart = await Cart.findOne(query).lean()
        if(!cart){
            throw new Error('Cart Not Found')
        }
        return product
    }
    async readMany(query){
        return await Cart.find(query).lean()
    }
    async updateOne(query, newData){
        const updated = await Cart.findOneAndUpdate(query, newData, { new: true }).lean()
        if(!updated){
            throw new Error('Cart Not Found')
        }
        return updated
    }
    async deleteOne(query){
        const deleted = await Cart.findOneAndDelete(query).lean()
        if(!deleted){
            throw new Error('Cart Not Found')
        }
        return deleted
    }
    async populate(query){
        const cart = await Cart.findOne(query)
        if(!cart){
            throw new Error('Cart Not Found')
        }
        return cart.populate('product.productId').lean()
    }
}





