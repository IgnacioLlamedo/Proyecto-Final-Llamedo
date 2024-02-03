import { cartDao } from "../daos/index.js"
import { service as cartService } from "../services/Cart.Service.js"

export async function postController(req, res, next){
    try{
        res.status(201).json(await cartDao.create())
    }
    catch(error){
        next(error)
    }
}

export async function getController(req, res, next){
    try{
        if(req.params.cid){
            res.json(await cartDao.readOne({ _id: req.params.cid }))
        }
        else{
            res.json(await cartDao.readMany(req.query))
        }
    }
    catch(error){
        next(error)
    }
}

export async function emptyController(req, res, next){
    try{
        res.status(202).json(await cartDao.updateOne({ _id: req.params.cid }, []))
    }
    catch(error){
        next(error)
    }
}

export async function addProductController(req, res, next){
    try{
        res.status(201).json(await cartService.addProduct(req.params.cid, req.params.pid))
    }
    catch(error){
        next(error)
    }
}

export async function deleteProductController(req, res, next){
    try{
        res.status(202).json(await cartService.deleteProduct(req.parms.cid, req.params.pid))
    }
    catch(error){
        next(error)
    }
}

export async function populateController(req, res, next){
    try{
        res.json(await cartDao.populate({ _id: req.params.cid }))
    }
    catch(error){
        next(error)
    }
}