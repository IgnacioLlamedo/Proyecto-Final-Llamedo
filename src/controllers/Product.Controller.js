import { productDao } from "../daos/index.js"

export async function postController(req, res, next){
    try{
        res.status(201).json(await productDao.create(req.body))
    }
    catch(error){
        next(error)
    }
}

export async function getController(req, res, next){
    try{
        if(req.params.pid){
            res.json(await productDao.readOne(req.params.pid))
        }
        else{
            res.json(await productDao.readMany(req.query))
        }
    }
    catch(error){
        next(error)
    }
}

export async function getControllerWeb(req, res, next){
    try{
        if(req.user.role === 'user'){
            const products = await productDao.readMany(req.query)
            const cartId = req.user.cartId
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
        else{
            res.render('adminProduct', 
            { 
                title: 'Admin'
            })
        }
    }
    catch(error){
        next(error)
    }
}

export async function deleteController(req, res, next){
    try{
        res.status(202).json(await productDao.deleteOne({ _id:req.params.pid }))
    }
    catch(error){
        next(error)
    }
}

export async function updateController(req, res, next){
    try{
        res.status(202).json(await productDao.updateOne({ _id:req.params.pid }, req.body))
    }
    catch(error){
        next(error)
    }
}