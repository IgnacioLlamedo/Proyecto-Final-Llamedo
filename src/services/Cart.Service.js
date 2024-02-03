import { cartDao, productDao } from "../daos/index.js";

class cartService{
    async addProduct(cid, pid){
        const cart = await cartDao.readOne(cid)
        await productDao.readOne(pid)
        for (const product of cart.products) {
            if(product.productID === pid){
                product.quantity ++
            }
            else{
                cart.products.push({
                    productID: pid,
                    quantity: 0
                })
            }
        }
        return await cartDao.updateOne(cid, cart)
    }
    async deleteProduct(cid, pid){
        const cart = await cartDao.readOne(cid)
        const n = 0
        for (const product of cart.products) {
            if(product.productID === pid){
                if(product.quantity > 1){
                    product.quantity --
                }
                else{
                    cart.products.slice(0, n).concat(cart.products.slice(n + 1))
                }
            }
            n ++
        }
        return await cartDao.updateOne(cid, cart)
    }
}

export const service = new cartService()


