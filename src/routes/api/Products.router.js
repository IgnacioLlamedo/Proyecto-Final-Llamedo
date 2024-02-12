import express from "express"
import { getController, postController, deleteController, updateController} from "../../controllers/Product.Controller.js"

export const productsRouter = express.Router()

productsRouter.get('/:pid?', getController)

productsRouter.post('/', postController)

productsRouter.delete('/:pid', deleteController)

productsRouter.put('/:pid', updateController)
