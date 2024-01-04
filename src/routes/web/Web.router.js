import { Router } from "express";
import { cm } from "../../CartManager.js";
import { pm } from "../../ProductManager.js";
import { dbCarts } from "../../models/CartMongoose.js";
import { sessionsRouter } from "./Sessions.router.js";
import { usersRouter } from "./Users.router.js";

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
        style: 'home.css',
        user: req.user
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

webRouter.use(sessionsRouter)
webRouter.use(usersRouter)

webRouter.get('/', (req, res) => { return res.redirect('/login') })