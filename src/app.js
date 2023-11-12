import { PRODUCTS_JSON, CARTS_JSON, PORT } from "./config.js"
import express from 'express'
import { ProductManager } from './ProductManager.js'
import { CartManager } from './CartManager.js'
import { productsRouter } from './routes/products.router.js'
import { cartsRouter } from './routes/carts.router.js'

const app = express()

export const pm = new ProductManager(PRODUCTS_JSON)
export const cm = new CartManager(CARTS_JSON)

app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, () => {
    console.log(`Listening in port ${PORT}`)
})
