import express from "express";
import { getControllerWeb } from "../../controllers/Product.Controller.js";

export const productsRouter = express.Router()

productsRouter.get('/products', getControllerWeb)


