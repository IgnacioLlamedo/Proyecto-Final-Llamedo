import { randomUUID } from "crypto"
import { Product } from "./models/ProductMongoose.js"

class ProductManager {
    
    async createProduct(productData) {
        productData._id = randomUUID()
        const product = await Product.create(productData)
        return product.toObject()
    }

    async findAll() {
        return await Product.find().lean()
    }

    async findById(id) {
        const search = await Product.findById(id).lean()
        if (!search) {
            throw new Error('Product Not Found')            
        }
        return search
    }

    async update(id, newData) {
        const updated = await Product.findByIdAndUpdate(id, { $set: newData }, { new: true }).lean()
        if (!updated) {
            throw new Error('Product Not Found')
        }
        return updated
    }

    async delete(id) {
        const deleted = await Product.findByIdAndDelete(id).lean()
        if (!deleted) {
            throw new Error('Product Not Found')
        }
        return deleted
    }

    async findByCategory(category) {
        const search = await Product.findMany({ category: category }).lean()
        if(!search) {
            throw new Error('Category Not Found')
        }
        return search
    }
}

export const pm = new ProductManager()
