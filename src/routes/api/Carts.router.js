import express from "express";
import { getController as list, postController as cre, addProductController as addProduct, deleteProductController as deleteProduct, emptyController as empty, populateController as populate } from "../../controllers/CartController.js";

export const cartsRouter = express.Router()

cartsRouter.use(express.json)

cartsRouter.post('/', cre)

cartsRouter.post('/:cid/products/:pid', addProduct)

cartsRouter.get('/', list)

cartsRouter.get('/:cid', populate)

cartsRouter.put('/:cid', empty)

cartsRouter.put('/:cid/products/:pid', deleteProduct)
