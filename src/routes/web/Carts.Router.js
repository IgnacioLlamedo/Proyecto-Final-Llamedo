import express from "express";
import { purchaseController, purchaseControllerWeb } from "../../controllers/Cart.Controller.js";
import { service as cartService } from "../../services/Cart.Service.js";

export const cartsRouter = express.Router()

cartsRouter.get('/cart', async (req, res) => {
    if(req.user){
        const cart = await cartService.getCart(req.user.cartId)
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