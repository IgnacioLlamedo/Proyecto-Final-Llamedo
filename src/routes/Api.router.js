import { Router, json } from "express";
import { productsRouter } from "./Products.router.js";
import { cartsRouter } from "./Carts.router.js";

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use('/carts', cartsRouter)
apiRouter.use('/products', productsRouter)
