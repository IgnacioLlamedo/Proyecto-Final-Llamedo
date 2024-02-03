import {Schema, model} from "mongoose"
import { randomUUID } from 'crypto'
import { Product } from "./Product.Mongoose.js"

const collection = 'carts'

const cartSchema = new Schema({
    _id: { type: String, default : randomUUID },
    products : [{
        productID: { type: String, ref: 'products'},
        quantity: {type : Number}
    }]
},{
    versionKey: false,
    strict: 'throw'
})

cartSchema.pre('find', function(next){
    this.populate('cart.$.productId')
    next()
})

export const Cart = model(collection, cartSchema)