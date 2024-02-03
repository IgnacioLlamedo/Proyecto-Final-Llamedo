import mongoose from "mongoose";
import config from "../config.js";
import { userDao as user} from "./User.dao.js";
import { productDao as prduct} from "./Product.dao.js";
import { cartDao as cart} from "./Cart.dao.js";

await mongoose.connect(config.cnxStr)
console.log(`Database connected`)

export const userDao = new user()
export const productDao = new prduct()
export const cartDao = new cart()
