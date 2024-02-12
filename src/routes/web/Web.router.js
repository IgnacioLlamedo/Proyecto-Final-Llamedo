import express from "express";
import { sessionsRouter } from "./Sessions.Router.js";
import { usersRouter } from "./Users.Router.js";
import { cartsRouter } from "./Carts.Router.js";
import { productsRouter } from "./Products.Router.js";

export const webRouter = express.Router()

webRouter.use(cartsRouter)

webRouter.use(productsRouter)

webRouter.use(sessionsRouter)

webRouter.use(usersRouter)

webRouter.get('/', (req, res) => { return res.redirect('/login') })