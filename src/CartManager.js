import { randomUUID } from "crypto"
import { dbCarts } from "./models/CartMongoose.js"


class CartManager {

    async createCart(cartData) {
        cartData._id = randomUUID()
        const cart = await dbCarts.create(cartData)
        return cart.toObject()
    }

    async findAll() {
        return await dbCarts.find().lean()
    }
}


export const cm = new CartManager()
