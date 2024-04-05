import { productDao } from "../daos/index.js";
import { userDao } from "../daos/index.js";

class productService{
    async createProduct(productData, mail){
        productData.owner = mail
        const product = await productDao.create(productData)
        return product
    }
    async deleteProduct(pid, mail){
        const user = await userDao.readOne(mail)
        const role = user.role
        if(role === 'admin'){
            await productDao.deleteOne({ _id: pid })
        }
        else if(role === 'premium'){
            const search = await productDao.readOne({ _id: pid })
            if(mail === search.owner){
                await productDao.deleteOne({ _id: pid })
            }
        }
    }
}

export const service = new productService()

