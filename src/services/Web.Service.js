import { getController } from "../controllers/Product.Controller.js"

class webService{
    async webProduct(){
        const products = getController
        console.log(products)
        const cartId = req.user.cartId
        console.log(cartId)
        res.render('home', 
        { 
            title: 'Products',
            productsExist: products.length > 0,
            products,
            cartId,
            style: 'home.css',
            user: req.user
        })
    }
    async webCart(){

    }
}

export const service = new webService()



