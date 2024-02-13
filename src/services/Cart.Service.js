import { cartDao, productDao } from "../daos/index.js";

class cartService{
    async addProduct(pid, cid){
        let cart
        if(cid){
            cart = await cartDao.readOne(cid)
        }
        else{
            cart = await cartDao.readOne(req.user.cartId)
        }
        await productDao.readOne(pid)
        if(cart.products.length === 0){
            cart.products.push({
                productID: pid,
                quantity: 1
            })
        }
        else{
            let boolean = false
            for (const product of cart.products) {
                if(product.productID === pid){
                    product.quantity ++
                    boolean = false
                    break
                }
                else{
                   boolean = true 
                }
            }
            if(boolean){
                cart.products.push({
                    productID: pid,
                    quantity: 1
                })
            }
        }
        const updated = await cartDao.updateOne(cid, cart)
        console.log("Product added")
        return updated
    }
    async deleteProduct(pid, cid){
        let cart
        if(cid){
            cart = await cartDao.readOne(cid)
        }
        else{
            cart = await cartDao.readOne(req.user.cartId)
        }
        await productDao.readOne(pid)
        let n = 0
        for (const product of cart.products) {
            if(product.productID === pid){
                if(product.quantity > 1){
                    product.quantity --
                }
                else{
                    cart.products.slice(0, n).concat(cart.products.slice(n + 1))
                    cart.products = []
                    console.log(cart)
                }
            }
            n ++
        }
        console.log("Product deleted")
        const updated = await cartDao.updateOne(cid, cart)
        return updated
    }
}

export const service = new cartService()


