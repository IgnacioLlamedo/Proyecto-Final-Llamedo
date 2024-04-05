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
        if(req.params.cid){
            res.status(202).json(await cartDao.updateOne({ _id: req.params.cid }, []))
        }
        else{
            res.status(202).json(await cartDao.updateOne({ _id: req.user.cartId }, []))
        }
    }
    catch(error){
        next(error)
    }
}

export async function addProductController(req, res, next){
    try{
        if(req.params.cid){
            res.status(201).json(await cartService.addProduct(req.params.pid, req.params.cid, req.user.email))
        }
        else{
            res.status(201).json(await cartService.addProduct(req.params.pid, req.user.cartId, req.user.email))
        }
    }
    catch(error){
        next(error)
    }
}

export async function deleteProductController(req, res, next){
    try{
        if(req.params.cid){
            res.status(202).json(await cartService.deleteProduct(req.params.pid, req.params.cid))
        }
        else{
            res.status(202).json(await cartService.deleteProduct(req.params.pid, req.user.cartId))
        }
    }
    catch(error){
        next(error)
    }
}

export async function populateController(req, res, next){
    try{
        if(req.params.cid){
            res.json(await cartDao.populate({ _id: req.params.cid }))
        }
        else{
            res.json(await cartDao.populate({ _id: req.user.cartId }))
        }
    }
    catch(error){
        next(error)
    }
}

export async function purchaseController(req, res, next){
    try{
        if(req.params.cid){
            res.json(await cartService.purchase(req.params.cid, req.user.email))
        }
        else{
            res.json(await cartService.purchase(req.user.cartId, req.user.email))
        }
    }
    catch(error){
        next(error)
    }
}

export async function purchaseControllerWeb(req, res, next){
    try{
        if(req.user){
            if(req.user.role === 'admin'){
                const ticket = await cartService.purchase(req.user.cartId, req.user.email)
                const cart = await cartDao.readOne(req.user.cartId)
                if (ticket){
                    res.render('purchase',
                    {   
                        title: 'Purchase Ticket',
                        warning: cart.products.length > 0,
                        ticket
                    })
                }
                else{
                    res.redirect('/purchase/error')
                }
            }
            else{
                res.redirect('/home')
            }
        }
        else{
            res.redirect('/login')
        }
    }
    catch(error){
        next(error)
    }
}
