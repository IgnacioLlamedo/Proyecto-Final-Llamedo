import express from "express";
import { populateController } from "../../controllers/Cart.Controller.js";

export const cartsRouter = express.Router()

cartsRouter.get('/:cid', async (req, res) => {
    /* const populated = await dbCarts.findById(req.params.cid).populate('products.productID')
    const products = populated.products */
    const populated = populateController
    const products = populated.products
    res.render('cart', 
    { 
        title: 'Cart',
        productsExist: products.length > 0,
        products,
        style: 'home.css'
    })
})
