import express from "express";
import { Cart } from "../../models/Cart.Mongoose.js";
import { purchaseController, purchaseControllerWeb } from "../../controllers/Cart.Controller.js";

export const cartsRouter = express.Router()

cartsRouter.get('/cart', async (req, res) => {
    if(req.user){
        const cart = (await Cart.find({ _id: req.user.cartId }))[0]
        const products = cart.products
        res.render('cart', 
        { 
            title: 'Cart',
            productsExist: products.length > 0,
            products,
            cartId: cart._id
        })
    }
    else{
        res.redirect('/login')
    }
})

cartsRouter.get('/purchase', purchaseControllerWeb)

cartsRouter.get('/purchase/error', async (req, res) => {
    if(req.user){
        res.render('failed',
        {   
            title: 'Purchase Error'
        })
    }
    else{
        res.redirect('/login')
    }
})