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
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

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

const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info:{
            title:'E-commerce Backend',
            version: '1.0',
            description:'Description'
        }
    },
    apis:['./docs/**/*.yaml']
}
const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

/*
    Documentar api:
        Products
            product router
                api/products
                    get '/:pid?'
                    post '/'
                    put '/:pid'
                    delete '/:pid'
        Carts
            ticket schema
            cart router
                api/carts
                    get '/'
                    get '/:cid'
                    post '/'
                    post '/:cid?/purchase'
                    put '/:cid?/addproducts/:pid'
                    put '/:cid?/delproducts/:pid'
                    put '/:cid?'
*/

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

