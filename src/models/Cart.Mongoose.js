import mongoose from "mongoose"
import { randomUUID } from 'crypto'
import { Product } from "./ProductMongoose.js"

const collection = 'carts'

const cartSchema = new Schema({
    _id: { type: String, default : randomUUID },
    products : [{
        productID: { type: String, ref: 'products'},
        quantity: {type : Number}
    }]
},{
    versionKey: false,
    strict: 'throw',
    statics: {
        cre: async function() {
            const cart = await mongoose.model(collection).create()
            return cart.toObject()
        },
        list: async query => {
            return await mongoose.model(collection).find(query).lean()
        },
        empty: async cid => {
            const cart = await mongoose.model(collection).find(cid)
            cart.products = []
            return await mongoose.model(collection).findOneAndReplace(cid, cart)
        },
        addProduct: async (cid, pid) => {
            const cart = mongoose.model(collection).findById(cid).lean()
            if(cart){
                const product = Product.list(pid)
                if(product){
                    const productInCart = cart.products.find(p => p.productID === pid)
                    if(productInCart){
                        const updatedCart = await mongoose.model(collection).findOneAndUpdate({ _id: cid, 'products.productID': pid }, { $inc: { 'products.$.quantity': 1 } }, { new: true })
                        return updatedCart
                    }
                    else{
                        return await mongoose.model(collection).findByIdAndUpdate(cid, { $push: { products: { productID: pid, quantity: 1 } } }, { new: true })
                    }
                }
                else{
                    throw new Error ('Product Not found')
                }
            }
            else{
                throw new Error ('Cart Not found')
            }
        },
        deleteProduct: async (cid, pid) =>{
            const cart = mongoose.model(collection).findById(cid).lean()
            if(cart){
                const productInCart = cart.products.find(p => p.productID === pid)
                if(productInCart){
                    const updatedCart = await mongoose.model(collection).findOneAndUpdate(cid, { $pull: { products: { productID: pid } } }, { new: true }).lean()
                    return updatedCart
                }
                else{
                    throw new Error ('Product Not found')
                }
            }
            else{
                throw new Error ('Cart Not found')
            }
        },
        populate: async cid => {
            return await mongoose.model(collection).findById(cid).populate('product.productId').lean()
        }
    }
})

cartSchema.pre('find', function(next){
    this.populate('cart.$.productId')
    next()
})

export const Cart = model(collection, cartSchema)