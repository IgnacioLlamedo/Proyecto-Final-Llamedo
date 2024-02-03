import express from "express";
import { postController as register, getController as list, getCurrentController as current, updateController as upd } from "../../controllers/User.Controller.js";

export const usersRouter = express.Router()

usersRouter.use(express.json)

usersRouter.post('/', register)

usersRouter.get('/', list)

usersRouter.get('/current', current)

usersRouter.put('/', upd)
