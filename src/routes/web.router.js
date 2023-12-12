import { Router } from "express";

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

