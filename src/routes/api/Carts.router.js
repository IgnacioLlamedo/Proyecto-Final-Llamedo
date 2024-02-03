import express from "express";
import { getController, postController, addProductController, deleteProductController, emptyController, populateController } from "../../controllers/Cart.Controller.js";

export const cartsRouter = express.Router()

cartsRouter.use(express.json)

cartsRouter.post('/', postController)

cartsRouter.post('/:cid/products/:pid', addProductController)

cartsRouter.get('/', getController)

cartsRouter.get('/:cid', populateController)

cartsRouter.put('/:cid', emptyController)

cartsRouter.put('/:cid/products/:pid', deleteProductController)
