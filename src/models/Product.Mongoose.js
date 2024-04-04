import {Schema, model} from "mongoose"
import { randomUUID } from "crypto"
import config from "../config.js"

const collection = 'products'

const productSchema = new Schema({
    _id: { type: String, default : randomUUID },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, default: config.prodImg },
    owner: { type: String, default: 'admin' }
}, {
    versionKey: false,
    strict: 'throw'
})

export const Product = model(collection, productSchema)
