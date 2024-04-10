import express from "express";
import { getController, postController, addProductController, deleteProductController, emptyController, purchaseController } from "../../controllers/Cart.Controller.js";

export const cartsRouter = express.Router()

cartsRouter.post('/', postController)

cartsRouter.put('/:cid?/addproducts/:pid', addProductController)

cartsRouter.get('/:cid?', getController)

cartsRouter.put('/:cid?', emptyController)

cartsRouter.put('/:cid?/delproducts/:pid', deleteProductController)

cartsRouter.post('/:cid?/purchase', purchaseController)
