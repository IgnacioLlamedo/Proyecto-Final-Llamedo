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

export async function resetPassController(req, res, next){
    try{
        res.status(202).json(await userService.resetPass(req.body.email, req.body.password))
    }
    catch(error){
        next(error)
    }
}

export async function resetPassControllerWeb(req, res, next){
    try{
        await userService.resetPass(req.body.email, req.body.password)
        res.redirect('/login')
    }
    catch(error){
        next(error)
    }
}

export async function changeRoleController(req, res, next){
    try{
        res.status(202).json(await userService.changeRole(req.params.email, req.params.role))
    }
    catch(error){
        next(error)
    }
}

export async function deleteController(req, res, next){
    try{
        res.status(202).json(await userService.deleteOne(req.params.email))
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
        if(req.user){
            if(req.user.role === 'admin'){
                const users = await userService.readMany()
                res.render('adminUser', 
                { 
                    title: 'Admin',
                    users,
                    admin: true
                })
            }
            else{
                /* res.redirect('/home') */
                const users = await userService.readMany()
                res.render('adminUser', 
                { 
                    title: 'Users',
                    users,
                    admin: false
                })
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
