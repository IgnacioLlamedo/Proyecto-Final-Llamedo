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

    async findById(id, newData) {
        const updated = await dbProducts.findByIdAndUpdate(id, { $set: newData }, { new: true }).lean()
        if (!updated) {
            throw new Error('Product Not Found')
        }
        return updated
    }

    async deleteById(id) {
        const deleted = await dbProducts.findByIdAndDelete(id).lean()
        if (!deleted) {
            throw new Error('Product Not Found')
        }
        return deleted
    }
}

export const pm = new ProductManager()
