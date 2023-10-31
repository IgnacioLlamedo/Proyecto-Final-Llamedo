import fs from 'fs/promises'

class Product {

    constructor({ title, description, price, thumbnail, code, stock }){
        this.code = code
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock
    }

    
}

export class ProductManager {
    #products

    constructor( path ){
        this.path = path
        this.#products = []
    }

    #nextId(){
        if (this.#products.length > 0) {
            return this.#products[this.#products.length - 1].code + 1
          } else {
            return 1
          }
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

    async updateProducts(code, productData){
        await this.#readProducts()
        const i = this.#products.findIndex(p => p.code === code)
        if(this.#products[i]){
            const newProd = new Product({code, ...this.#products[i], ...productData})
            this.#products[i] = newProd
            await this.#writeProducts()
            return newProd
        }
        else{
            throw new Error('No se puede actualizar, producto no encontrado')
        } 
    }

    async deleteProduct(code){
        await this.#readProducts()
        const i = this.#products.findIndex(p => p.code === code)
        if(this.#products[i]){
            const newArray = this.#products.splice(i, 1)
            await this.#writeProducts()
            return newArray[0]
        }
        else{
            throw new Error('No se puede borrar, producto no encontrado')
        }
    }

    async addProduct({title, description, price, thumbnail, stock}){
        if (!title || !description || !price || !thumbnail || !stock) {
            console.log('Error: Todos los campos son obligatorios');
            return;
        }
        else{
            await this.#readProducts()
            const code = this.#nextId()
            const product = new Product({code, title, description, price, thumbnail, stock})
            const findCode = this.#products.find(p => p.code === code)
            if ((!findCode)){
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

    getProductById(code){
        const find = this.#products.find(p => p.code === code)
        if (!find){
            throw new Error("Not found")
        } 
        return find
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
        const productById = products.find(p => p.code === parseInt(id))
        if (!productById) throw new Error(`Product ${id} Not Found`)
        return productById
    }
}

/* async function main(){

    const pm = new ProductManager({ path: 'products.json' })

    pm.reset()

    await pm.addProduct({  })
    await pm.addProduct({ title: "t2", description: "d2", price: 100, thumbnail: "img", stock: 10 })
    await pm.addProduct({ title: "t3", description: "d3", price: 100, thumbnail: "img", stock: 10 })
    await pm.addProduct({ title: "t4", description: "d4", price: 100, thumbnail: "img", stock: 10 })
    await pm.deleteProduct(2)
    await pm.updateProducts(1, { title: 'New Title' })

    console.log("Listado de productos: ")
    console.log(await pm.getProducts())
    console.log("Producto por id: ")
    console.log(await pm.getProductById(3))
}

main() */