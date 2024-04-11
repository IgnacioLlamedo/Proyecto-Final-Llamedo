import express from "express";
import { postController, getController, getCurrentController, changeRoleController, deleteController, resetPassController, deleteManyController } from "../../controllers/User.Controller.js";

export const usersRouter = express.Router()

usersRouter.post('/', postController)

usersRouter.get('/', getController)

usersRouter.get('/current', getCurrentController)

usersRouter.put('/', resetPassController)

usersRouter.delete('/:email', deleteController)

usersRouter.delete('/', deleteManyController)

usersRouter.put('/role/:email/:role', changeRoleController)
