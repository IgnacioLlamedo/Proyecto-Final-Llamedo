import express from "express";
import { Cart } from "../../models/Cart.Mongoose.js";

export const cartsRouter = express.Router()

cartsRouter.get('/cart', async (req, res) => {
    const cart = await Cart.find({ _id: req.user.cartId })
    const products = cart[0].products
    res.render('cart', 
    { 
        title: 'Cart',
        productsExist: products.length > 0,
        products,
        cartId: cart[0]._id
    })
})
