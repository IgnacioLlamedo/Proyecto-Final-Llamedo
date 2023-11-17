import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'

class Product {

    constructor({ id, title, description, code, price, status, stock, category, thumbnails }){
        this.id = id
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnails = thumbnails
    }

    
}

export class ProductManager {
    #products

    constructor( path ){
        this.path = path
        this.#products = []
    }

    async reset(){
        this.#products = []
        await this.#writeProducts()
    }

    async #writeProducts(){
        const productsJson = JSON.stringify(this.#products, null, 2)
        await fs.writeFile(this.path, productsJson)
    }

    async #readProducts(){
        const productsInJson = await fs.readFile(this.path, 'utf-8')
        const dataProducts = JSON.parse(productsInJson)
        this.#products = dataProducts.map(j => new Product(j))
    }

    async updateProductsArray(id, productData){
        await this.#readProducts()
        const i = this.#products.findIndex(p => p.id === id)
        if(this.#products[i]){
            const newProd = new Product({id, ...this.#products[i], ...productData})
            this.#products[i] = newProd
            await this.#writeProducts()
            return newProd
        }
        else{
            throw new Error('Product Not Found')
        } 
    }

    async deleteProductArray(id){
        await this.#readProducts()
        const i = this.#products.findIndex(p => p.id === id)
        if(this.#products[i]){
            const newArray = this.#products.splice(i, 1)
            await this.#writeProducts()
            return newArray[0]
        }
        else{
            throw new Error('Product Not Found')
        }
    }

    async addProductArray({title, description, price, thumbnail, stock, status, category}){
        if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
            throw new Error('All fields are necessary')
        }
        else{
            await this.#readProducts()
            const id = uuidv4()
            const product = new Product({id, title, description, price, thumbnail, stock, status, category})
            const findId = this.#products.find(p => p.id === id)
            if ((!findId)){
                this.#products.push(product)
                await this.#writeProducts()
            }
            else{
                throw new Error("Repeated code")
            }
            return product
        }
    }

    async getProductsArray(){
        await this.#readProducts()
        return this.#products
    }

    getProductByIdArray(code){
        const find = this.#products.find(p => p.code === code)
        if (!find){
            throw new Error("Product Not found")
        } 
        return find
    }

    addProductJSON = async ({ title, description, code, price, status, stock, category, thumbnails }) => {
        if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
            throw new Error('All fields are necessary')
        }
        else {
            const id = uuidv4()
            const newProduct = { id, title, description, code, price, status, stock, category, thumbnails }
            this.#products = await this.getProductsJSON()
            this.#products.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(this.#products))
            return newProduct
        }
    }

    async getProductsJSON(limit){
        const json = await fs.readFile(this.path, "utf-8")
        const data = JSON.parse(json)
        if (limit){
            if (isNaN(limit)){
                throw new Error("NaN")
            }
            return data.slice(0, limit)
        }
        return data
    }

    async getProductByIdJSON(id){
        const json = await fs.readFile(this.path, 'utf-8')
        const products = JSON.parse(json)
        const productById = products.find(p => p.id === id)
        if (!productById) throw new Error(`Product ${id} Not Found`)
        return productById
    }

    updateProductJSON = async (id, {...data}) => {
        if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
            throw new Error('All fields are necessary')
        }
        else {
            const response = await this.getProductsJSON()
            const i = response.findIndex(p => p.id === id)
            if (i !== -1) {
                response[i] = {id, ...data}
                await fs.writeFile(this.path, JSON.stringify(response))
                return response[i]
            }
            else {
                throw new Error(`Product ${id} Not Found`)
            }
        }
    
    }

    deleteProductJSON = async (id) => {
        const response = await this.getProductsJSON()
        const i = response.findIndex(p => p.id === id)
        if (i !== -1) {
            response.splice(i, 1)
            await fs.writeFile(this.path, JSON.stringify(response))
        }
        else {
            throw new Error(`Product ${id} Not Found`)
        }
    }
}
