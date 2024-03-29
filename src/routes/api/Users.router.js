import express from "express";
import { postController, getController, getCurrentController, changeRoleController, deleteController, resetPassController } from "../../controllers/User.Controller.js";

export const usersRouter = express.Router()

usersRouter.post('/', postController)

usersRouter.get('/', getController)

usersRouter.get('/current', getCurrentController)

usersRouter.put('/', resetPassController)

usersRouter.delete('/:email', deleteController)

usersRouter.put('/role/:email', changeRoleController)
