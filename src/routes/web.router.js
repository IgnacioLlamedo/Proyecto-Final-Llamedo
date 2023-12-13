import { Router } from "express";
import { pm } from "../ProductManager.js";
import { dbCarts } from "../models/CartMongoose.js";

export const webRouter = Router()

webRouter.get('/products', async (req, res) => {
    const products = await pm.findAll()
    res.render('home', 
    { 
        title: 'Products',
        productsExist: products.length > 0,
        products,
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
