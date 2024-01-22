import mongoose from "mongoose";
import config from "../config.js";
import { userDao } from "./User.dao.js";
import { productDao } from "./Product.dao.js";
import { cartDao } from "./Cart.dao.js";

await mongoose.connect(config.cnxStr)
console.log(`Database connected`)

export const userDao = new userDao()
export const productDao = new productDao()
export const cartDao = new cartDao()
