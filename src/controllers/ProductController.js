import { Product } from "../models/ProductMongoose.js";

export async function postController(req, res, next){
    const productData = req.body
    if(req.file){
        productData.thumbnail = req.file.path
    }
    const product = await product.load(productData)
    req.status(201).json(product)
}

export async function getController(req, res, next){
    const productData = req.query
    const products = await Product.list(productData)
    res.json(products)
}

export async function deleteController(req, res, next){
    const productData = req.query
    const products = await Product.delete(productData)
    res.json(products)
}
