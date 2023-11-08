import { Router } from "express";
import { cm } from "../app.js";

const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await cm.newCart()
        res.json(response)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params
    try {
        const response = await cm.getCartProducts(cid)
        res.json(response)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params
    try {
        await cm.addProductToCart(cid, pid)
        res.send('Product added')
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

export {cartsRouter}
