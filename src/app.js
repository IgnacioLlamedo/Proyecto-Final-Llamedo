import express from 'express'
import { ExpressHandlebars, engine } from "express-handlebars"
import { s } from './middlewares/session.js'
import { webRouter } from "./routes/web/Web.router.js"
import { apiRouter } from "./routes/api/Api.router.js"
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import { authentication } from './middlewares/passport.js'
import config from './config.js'
import { mockingRouter } from './mock.js'
import { logger } from './utils/logger.js'
import { loggerInRequest } from './middlewares/logger.js'
import { errorHandler } from './middlewares/error.handler.js'

const app = express()

app.listen(config.port, () => {
    logger.info(`Listening in port ${config.port}`)
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
app.use(loggerInRequest)
app.use(errorHandler)
app.use('/api', apiRouter)
app.use('/', webRouter)

app.use('/mockingproducts', mockingRouter)

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
} 
Ejemplo user
{
    "email": "b@mail.com",
    "password": "123",
    "username": "nameApi"
} 
*/

