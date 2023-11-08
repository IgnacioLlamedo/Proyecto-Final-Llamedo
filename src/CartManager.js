import { promises as fs } from 'fs'
import { v4 as uuidv4 } from 'uuid'

export class CartManager {

    constructor( path ) {
        this.path = path
        this.carts = []
    }

    getCarts = async () => {
        const response = await fs.readFile(this.path, 'utf-8')
        const responseJSON = JSON.parse(response)
        return responseJSON
    }

    getCartProducts = async (id) => {
        const carts = await this.getCarts()
        const cart = carts.find(cart => cart.id === id)
        if (cart) {
            return cart.products
        }
        else {
            throw new Error('Cart Not Found')
        }
    }

    newCart = async () => {
        const id = uuidv4()
        const newCart = { id, products: [] }
        this.carts = await this.getCarts()
        this.carts.push(newCart)
        await fs.writeFile(this.path, JSON.stringify(this.carts))
        return newCart
    }

    addProductToCart = async (cartId, productId) => {
        const response = await this.getCarts()
        const i = response.findIndex(cart => cart.id === cartId)
        if (i !== -1) {
            const cartProducts = await this.getCartProducts(cartId)
            const productIndex = cartProducts.findIndex(product => product.productId === productId)
            if (productIndex !== -1) {
                cartProducts[productIndex].quantity = cartProducts[productIndex].quantity + 1
            }
            else {
                cartProducts.push({ productId, quantity : 1 })
            }
            response[i].products = cartProducts
            await fs.writeFile(this.path, JSON.stringify(response))
        }
        else {
            throw new Error('Cart Not Found')
        }
    }
}
