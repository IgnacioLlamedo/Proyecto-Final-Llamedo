class Product {

    constructor({ title, description, price, thumbnail, code, stock }){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }

    
}

class ProductManager {
    static #ultimoId = 0
    #products

    constructor(){
        this.#products = []
    }

    static #siguienteId(){
        return ++ProductManager.#ultimoId
    }

    addProduct({title, description, price, thumbnail, stock}){
        const code = ProductManager.#siguienteId()
        const product = new Product({title, description, price, thumbnail, code, stock})
        const findCode = this.#products.find(p => p.code === code)
        if ((!findCode)){
            this.#products.push(product)
        }
        else{
            throw new Error("Repeated code")
        }
        if (!title || !description || !price || !thumbnail || !stock) {
            console.log('Error: Todos los campos son obligatorios');
            return;
        }
        return product
    }

    getProducts(){
        return this.#products
    }

    getProductById(code){
        const find = this.#products.find(p => p.code === code)
        if (!find){
            throw new Error("Not found")
        } 
        return find
    }
}

const pm = new ProductManager()

const p1 = pm.addProduct({ title: "t1", description: "d1", price: 100, thumbnail: "img", stock: 10 })
const p2 = pm.addProduct({ title: "t2", description: "d2", price: 100, thumbnail: "img", stock: 10 })
const p3 = pm.addProduct({ title: "t3", description: "d3", price: 100, thumbnail: "img", stock: 10 })
const p4 = pm.addProduct({ title: "t4", description: "d4", price: 100, thumbnail: "img", stock: 10 })

console.log("Listado de productos: ")
console.log(pm.getProducts())
console.log("Producto por id: ")
console.log(pm.getProductById(3))