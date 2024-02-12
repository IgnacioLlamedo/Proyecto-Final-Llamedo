import { Router, json } from "express";
import { productsRouter } from "./Products.router.js";
import { cartsRouter } from "./Carts.router.js";
import { sessionsRouter  } from "./Sessions.router.js";
import { usersRouter } from "./Users.router.js";

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use('/carts', cartsRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/sessions', sessionsRouter)
apiRouter.use('/users', usersRouter)
