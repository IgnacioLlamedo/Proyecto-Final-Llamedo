import { PRODUCTS_JSON, PORT } from "./config.js"
import express from 'express'
import { ProductManager } from './ProductManager.js'

const pm = new ProductManager(PRODUCTS_JSON)
const app = express()

app.get('/products', async (req, res) => {
    const limit = parseInt(String(req.query.limit))
    try {
        const products = await pm.getProductsJSON(limit)
        res.json(products)
    }
    catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
})

app.get('/products/:id', async (req, res) => {
    const id = req.params.id
    try{
        const product = await pm.getProductByIdJSON(id)
        res.json(product)
    }
    catch (error){
        res.json({
            status: "error",
            message: error.message
        })
    }
})

app.listen(PORT, () => {
    console.log(`conectado y escuchando en puerto ${PORT}`)
})
