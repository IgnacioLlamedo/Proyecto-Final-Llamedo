import express from "express";
import { getController, postController, addProductController, deleteProductController, emptyController, populateController } from "../../controllers/Cart.Controller.js";

export const cartsRouter = express.Router()

cartsRouter.post('/', postController)

cartsRouter.put('/:cid?/addproducts/:pid', addProductController)

cartsRouter.get('/', getController)

cartsRouter.get('/:cid', populateController)

cartsRouter.put('/:cid?', emptyController)

cartsRouter.put('/:cid?/delproducts/:pid', deleteProductController)
