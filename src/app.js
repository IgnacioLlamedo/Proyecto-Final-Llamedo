import { PRODUCTS_JSON, CARTS_JSON, PORT } from "./config.js"
import express from 'express'
import { ProductManager } from './ProductManager.js'
import { CartManager } from './CartManager.js'
import { productsRouter } from './routes/Products.router.js'
import { cartsRouter } from './routes/carts.router.js'
import { engine } from "express-handlebars"
import { webRouter } from "./routes/web.router.js"
import { Server as IOServer } from 'socket.io'

const app = express()

export const pm = new ProductManager(PRODUCTS_JSON)
export const cm = new CartManager(CARTS_JSON)

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/static', express.static('./static'))
app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', webRouter)

const server = app.listen(PORT, () => {
    console.log(`Listening in port ${PORT}`)
})

const ioServer = new IOServer(server)

ioServer.on('connection', async socket => {
    console.log('Client conected', socket.id)
    const products = await pm.getProductsJSON()
    console.log(products)
    
    socket.emit('update', products)
    socket.on('addProduct', async product => {
        await pm.addProductJSON(product)
        ioServer.sockets.emit('update', await pm.getProductsJSON())
    })
})
