import { Router } from "express";
import { pm } from "../app.js";

export const webRouter = Router()

webRouter.get('/', async (req, res) => {
    const products = await pm.getProductsJSON()
    res.render('home', 
        { title: 'Products',
        productsExist: products.length > 0,
        products,
        style: 'home.css'
    })
})

webRouter.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', {title: 'Real Time Products', style: 'realTimeProducts.css'})
})
