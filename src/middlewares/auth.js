export function logApi(req, res, next){
    if(!req.isAuthenticated()){
        return res.status(400).json({ status: 'error', message: 'Login is necessary'})
    }
    next()
}

export function logWeb(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next()
}

export function isAdmin(email, password){
    return email === 'adminCoder@coder.com' && password === 'adminCod3r123'
}

export function adminPermission(req, res, next){
    if(req.user.role !== 'admin'){
        return res.status(403).json({ status : 'error', message: 'Admin permission is required'})
    }
    next()
}
