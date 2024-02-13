import { cartDao, productDao, ticketDao } from "../daos/index.js";

class cartService{
    async addProduct(pid, cid){
        const cart = await cartDao.readOne(cid)
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
        let cart = await cartDao.readOne(cid)
        await productDao.readOne(pid)
        let n = 0
        for (const product of cart.products) {
            if(product.productID === pid){
                if(product.quantity > 1){
                    product.quantity --
                }
                else{
                    cart.products.slice(0, n).concat(cart.products.slice(n + 1))
                    const a1 = cart.products.slice(0, n)
                    const a2 = cart.products.slice(n + 1)
                    cart.products = a1.concat(a2)
                    console.log(cart)
                }
            }
            n ++
        }
        console.log("Product deleted")
        const updated = await cartDao.updateOne(cid, cart)
        return updated
    }
    async purchase(cid){
        const array = []
        let cart = (await cartDao.populate({ _id: cid }))[0]
        console.log(cart.products)
        for (const product of cart.products){
            if(product.quantity > product.productID.stock){
                array.push(product)
            }
            else{
                const newData = {
                    stock: product.productID.stock - product.quantity
                }
                await productDao.updateOne(product.productID._id, newData)
            }
        }
        if(array.length !== 0){
            
        }
        cart.products = array
        await cartDao.updateOne(cart._id, cart)
        /* 
            cart.products = [
                {
                    productID: {
                        _id: string
                        stock: number
                        price: number
                    }
                    quantity: number
                }
            ] 
        */
    }
}

export const service = new cartService()


