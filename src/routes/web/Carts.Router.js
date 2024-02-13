import express from "express";
import { Cart } from "../../models/Cart.Mongoose.js";
import { purchaseController } from "../../controllers/Cart.Controller.js";

export const cartsRouter = express.Router()

cartsRouter.get('/cart', async (req, res) => {
    const cart = (await Cart.find({ _id: req.user.cartId }))[0]
    const products = cart.products
    res.render('cart', 
    { 
        title: 'Cart',
        productsExist: products.length > 0,
        products,
        cartId: cart._id
    })
})

cartsRouter.post('/:cid?/purchase', purchaseController)

cartsRouter.get('/purchase', async (req, res) => {
    res.render('')
})