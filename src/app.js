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

/* let array = []
array.push({id: "1", quantity: 5})
array.push({id: "2", quantity: 5})
array.push({id: "3", quantity: 1})
let n = 0
for (const product of array){
    if(product.id === "3"){
        if(product.quantity > 1){
            product.quantity --
        }
        else{
            array.slice(0, n).concat(array.slice(n + 1))
            const a1 = array.slice(0, n)
            const a2 = array.slice(n + 1)
            console.log(a1)
            console.log(a2)
            const upd = a1.concat(a2)
            console.log(upd)
            array = upd
        }
    }
    n ++
}
console.log(array) */

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

/* 
    Falta TODO lo del ticket de orden ç
        ticket: {
            _id: autogenerado
            code: string, único
            purchase_datetime: fecha y hora de la compra
            amount: número, precio total de la compra
            purchaser: string, mail del usuario que compro
        }
        Ruta /:cid/purchase en cartRouter
            Debe corroborar el stock de los productos
                Si el stock es suficiente este debe ser actualizado al finalizar la compra
                Si el stock no es suficiente se deben comprar todos los productos que si tegan suficiente stock, dejando los que no tienen suficiente en el carrito
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

