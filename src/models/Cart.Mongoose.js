import {Schema, model} from "mongoose"
import { randomUUID } from 'crypto'

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
    this.populate('products.productID')
    next()
})

export const Cart = model(collection, cartSchema)