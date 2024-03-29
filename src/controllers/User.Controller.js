import { service as userService } from "../services/User.Service.js"

export async function postController(req, res, next){
    try{
        res.status(201).json(await userService.create(req.body))
    }
    catch(error){
        next(error)
    }
}

export async function getController(req, res, next){
    try{
        if(req.body.email){
            res.json(await userService.readOne({ email: req.body.email }))
        }
        else{
            res.json(await userService.readMany())
        }
    }
    catch(error){
        next(error)
    }
}

export async function updateController(req, res, next){
    try{
        res.status(202).json(await userService.updateOne({ email:req.body.email }, req.body.password))
    }
    catch(error){
        next(error)
    }
}

export async function getCurrentController(req, res, next){
    try{
        return req.user
    }
    catch(error){
        next(error)
    }
}

export async function getAdminUsers(req, res, next){
    try{
        if(req.user.role === 'user'){
            res.redirect('/home')
        }
        else{
            const users = await userService.readMany()
            res.render('adminUser', 
            { 
                title: 'Admin',
                users,
            })
        }
    }
    catch(error){
        next(error)
    }
}
