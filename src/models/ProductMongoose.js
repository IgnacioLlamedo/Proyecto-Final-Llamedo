import mongoose, { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
import config from "../config.js"

const collection = 'products'

const productSchema = new Schema({
    _id: { type: String, required : true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, default: config.prodImg }
}, {
    versionKey: false,
    strict: 'throw',
    statics: {
        load: async (productData) => {
            const user = await mongoose.model(collection).create(productData)
            return user.toObject()
        },
        list: async query => {
            return await mongoose.model(collection).find(query).lean()
        },
        delete: async query => {
            return await mongoose.model.apply(collection).findOneAndDelete(query)
        }
    }
})

productSchema.plugin(mongoosePaginate)

export const Product = model(collection, productSchema)
