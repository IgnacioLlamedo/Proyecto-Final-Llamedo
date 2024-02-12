import express from "express";
import { postController, getController, getCurrentController, updateController } from "../../controllers/User.Controller.js";

export const usersRouter = express.Router()

usersRouter.post('/', postController)

usersRouter.get('/', getController)

usersRouter.get('/current', getCurrentController)

usersRouter.put('/', updateController)
