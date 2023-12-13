import { Schema, model } from "mongoose"

const cartSchema = new Schema({
    _id: { type: String, required : true },
    products : [{
        productID: { type: String, ref: 'products'},
        quantity: {type : Number}
    }]
},{
    versionKey: false,
    strict: 'throw',
    /* methods: {} */
})

export const dbCarts = model('carts', cartSchema)