import { Product } from "../models/Product.Mongoose.js";
import { NotFoundError } from "../models/errors/notFound.error.js";

export class productDao {
    async create(productData){
        const product = await Product.create(productData)
        return product.toObject()
    }
    async readOne(query){
        const product = await Product.findOne({ _id: query }).lean()
        if(!product){
            throw new NotFoundError('Product')
        }
        return product
    }
    async readMany(query){
        return await Product.find(query).lean()
    }
    async updateOne(query, newData){
        const updated = await Product.findOneAndUpdate({ _id: query }, newData, { new: true }).lean()
        if(!updated){
            throw new NotFoundError('Product')
        }
        return updated
    }
    async deleteOne(query){
        const deleted = await Product.findOneAndDelete({ _id: query }).lean()
        if(!deleted){
            throw new NotFoundError('Product')
        }
        return deleted
    }
}

