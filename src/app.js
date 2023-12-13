import express from 'express'
import { cm } from './CartManager.js'
import { pm } from './ProductManager.js'
import { ExpressHandlebars, engine } from "express-handlebars"
import { webRouter } from "./routes/Web.router.js"
import { apiRouter } from "./routes/Api.router.js"
import mongoose from "mongoose"
import { PORT , MONGO_CNX_STR} from "./config.js"
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

await mongoose.connect(MONGO_CNX_STR)
console.log(`Database connected`)

const app = express()

app.listen(PORT, () => {
    console.log(`Listening in port ${PORT}`)
})

/* await cm.createCart() */

/* console.log(await cm.findAll()) */

/* await pm.createProduct({
    title: 'q',
    description: 'w',
    code:'e',
    price: 5,
    stock: 5,
    category: 'r'
}) */

/* console.log(await pm.findAll()) */

app.engine('handlebars', engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/static', express.static('./static'))
app.use(express.json())
app.use('/api', apiRouter)
app.use('/', webRouter)
