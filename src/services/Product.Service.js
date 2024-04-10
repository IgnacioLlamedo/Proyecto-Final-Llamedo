import { productDao } from "../daos/index.js";
import { userDao } from "../daos/index.js";
import { service as mailService } from "./Mail.Service.js";

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
        const search = await productDao.readOne(pid)
        if(role === 'admin'){
            deleted = await productDao.deleteOne(pid)
        }
        else if((role === 'premium') && (mail === search.owner)){
            deleted = await productDao.deleteOne(pid)
        }
        if(deleted){
            const productOwner = await userDao.readOne(search.owner)
            if(productOwner.role === 'premium'){
                //mandar mail al owner
                await mailService.productDeletedMail(search)
            }
        }
    }
}

export const service = new productService()

