import { Product } from "../models/ProductMongoose.js";

export class productDao {
    async create(productData){
        const product = await Product.create(productData)
        return product.toObject()
    }
    async readOne(query){
        const product = await Product.findOne(query).lean()
        if(!product){
            throw new Error('Product Not Found')
        }
        return product
    }
    async readMany(query){
        return await Product.find(query).lean()
    }
    async updateOne(query, newData){
        const updated = await Product.findOneAndUpdate(query, newData, { new: true }).lean()
        if(!updated){
            throw new Error('Product Not Found')
        }
        return updated
    }
    async deleteOne(query){
        const deleted = await Product.findOneAndDelete(query).lean()
        if(!deleted){
            throw new Error('Product Not Found')
        }
        return deleted
    }
}

