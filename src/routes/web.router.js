import { Router } from "express";
import { cm } from "../CartManager.js";
import { pm } from "../ProductManager.js";
import { dbCarts } from "../models/CartMongoose.js";

export const webRouter = Router()

webRouter.get('/products', async (req, res) => {
    const products = await pm.findAll()
    const cart = await cm.findAll()
    const cartId = cart[0]._id
    console.log(cartId)
    res.render('home', 
    { 
        title: 'Products',
        productsExist: products.length > 0,
        products,
        cartId,
        style: 'home.css'
    })
})

webRouter.get('/carts/:cid', async (req, res) => {
    const populated = await dbCarts.findById(req.params.cid).populate('products.productID')
    const products = populated.products
    res.render('cart', 
    { 
        title: 'Cart',
        productsExist: products.length > 0,
        products,
        style: 'home.css'
    })
})
