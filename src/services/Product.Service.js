import { productDao } from "../daos/index.js";
import { userDao } from "../daos/index.js";

class productService{
    async createProduct(productData, mail){
        productData.owner = mail
        const product = await productDao.create(productData)
        return product
    }
    async deleteProduct(pid, mail){
        let deleted
        const user = await userDao.readOne(mail)
        const role = user.role
        if(role === 'admin'){
            deleted = await productDao.deleteOne(pid)
        }
        else if(role === 'premium'){
            const search = await productDao.readOne(pid)
            if(mail === search.owner){
                deleted = await productDao.deleteOne(pid)
            }
        }
        if(deleted){
            const product = await productDao.readOne(pid)
            const productOwner = await userDao.readOne(product.owner)
            if(productOwner.role === 'premium'){
                //mandar mail al owner
            }
        }
    }
}

export const service = new productService()

