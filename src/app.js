import express from 'express'
import { cm } from './CartManager.js'
import { pm } from './ProductManager.js'
import { ExpressHandlebars, engine } from "express-handlebars"
import { s } from './middlewares/session.js'
import { webRouter } from "./routes/web/Web.router.js"
import { apiRouter } from "./routes/api/Api.router.js"
import mongoose from "mongoose"
import { PORT , MONGO_CNX_STR} from "./config.js"
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import { authentication } from './middlewares/passport.js'
import { Db } from 'mongodb'
import { dbCarts } from './models/CartMongoose.js'

await mongoose.connect(MONGO_CNX_STR)
console.log(`Database connected`)

const app = express()

app.listen(PORT, () => {
    console.log(`Listening in port ${PORT}`)
})

/* await cm.createCart() */

/* const a = await cm.findAll()

console.log(a[0]._id) */

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
app.use(s)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(authentication)
app.use('/api', apiRouter)
app.use('/', webRouter)

/* client secret: 2ac002f55b88da802c13cefc9c2cff41d403acd1 */
