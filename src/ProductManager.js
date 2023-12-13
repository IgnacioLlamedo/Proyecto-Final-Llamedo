import { randomUUID } from "crypto"
import { dbProducts } from "./models/ProductMongoose.js"

class ProductManager {
    
    async createProduct(productData) {
        productData._id = randomUUID()
        const product = await dbProducts.create(productData)
        return product.toObject()
    }

    async findAll() {
        return await dbProducts.find().lean()
    }

    async findById(id) {
        const search = await dbProducts.findById(id).lean()
        if (!search) {
            throw new Error('Product Not Found')            
        }
        return search
    }

    async update(id, newData) {
        const updated = await dbProducts.findByIdAndUpdate(id, { $set: newData }, { new: true }).lean()
        if (!updated) {
            throw new Error('Product Not Found')
        }
        return updated
    }

    async delete(id) {
        const deleted = await dbProducts.findByIdAndDelete(id).lean()
        if (!deleted) {
            throw new Error('Product Not Found')
        }
        return deleted
    }

    async findByCategory(category) {
        const search = await dbProducts.findMany({ category: category }).lean()
        if(!search) {
            throw new Error('Category Not Found')
        }
        return search
    }
}

export const pm = new ProductManager()
