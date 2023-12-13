import { Router } from "express";
import { cm } from "../CartManager.js"
import { dbCarts } from "../models/CartMongoose.js";

export const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await dbCarts.create(req.body)
        res.json(newCart)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const search = await dbCarts.findById(req.params.cid).populate('carts.productID')
        res.json(search)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await cm.addToCart(cid, pid)
        res.json(cart)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

cartsRouter.put('/:cid', async (req, res) => {
    try {
        const { product, quantity } = req.body
        const cart = await cm.updateCart(req.params['cid'], { product, quantity })
        res.json(cart)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

cartsRouter.put('/:cid/:products/:pid', async (req, res) => {
    try {
        const {quantity } = req.body
        const cart = await cm.updateQuantity(req.params['cid'], req.params['pid'], quantity)
        res.json(cart)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

cartsRouter.delete()
