import express from 'express'
import { ExpressHandlebars, engine } from "express-handlebars"
import { s } from './middlewares/session.js'
import { webRouter } from "./routes/web/Web.router.js"
import { apiRouter } from "./routes/api/Api.router.js"
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import { authentication } from './middlewares/passport.js'
import config from './config.js'

const app = express()

app.listen(config.port, () => {
    console.log(`Listening in port ${config.port}`)
})

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

/* 
Ejemplo de producto
{
    "title": "title",
    "description": "description",
    "code": "code",
    "price": 1,
    "stock": 1,
    "category": "category"
} */

/* There's a key difference between lean() and toObject() - toObject() converts a mongoose document into a POJO, 
lean() makes it so that you never get a mongoose document and just get a POJO. 
Mongoose documents have a lot under the hood and that comes with performance impact, 
so lean() lets you bypass the performance overhead, but you miss out on most of the benefits of using mongoose. 
Most of the time you just want to use .toObject() unless you're really starving for extra performance. */

/* .Capas:
          daos

          daos = data access object, operaciones CRUD
          archivo index en el que se elige el tipo de persistencia

          capa de routers: routers, controlers, middlewares
          capa persistencia: daos, models(mongoose schemas)
          capa negocio: funciones, logica, programacion
*/