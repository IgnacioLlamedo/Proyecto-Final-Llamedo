import { Cart } from "../models/CartMongoose.js";

export async function postController(req, res, next){
    const cart = Cart.cre()
    res.status(201).json(cart)
}

export async function getController(req, res, next){
    const query = req.query
    const cart = Cart.list(query)
    res.json(cart)
}

export async function emptyController(req, res, next){
    const cid = req.params
    const cart = Cart.empty(cid)
    res.status(201).json(cart)
}

export async function addProductController(req, res, next){
    const { cid, pid } = req.params
    const cart = Cart.addProduct(cid, pid)
    res.status(201).json(cart)
}

export async function deleteProductController(req, res, next){
    const { cid, pid } = req.params
    const cart = Cart.deleteProduct(cid, pid)
    res.status(201).json(cart)
}

export async function populateController(req, res, next){
    const cid = req.params
    const cart = Cart.populate(cid)
    res.json(cart)
}


