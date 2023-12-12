import { Router } from "express";
import { cm } from "../CartManager.js"

export const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => {
    try {
        
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
        
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})
