import { productDao } from "../daos/index.js";

class productService{
    async createProduct(productData, mail){
        productData.owner = mail
         await productDao.create(productData)
    }
}

export const service = new productService()

