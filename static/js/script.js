function add(pid, cid){
    console.log('add')
    console.log('pid: ' + pid + ' type: ' + typeof(pid))
    console.log('cid: ' + cid + ' type: ' + typeof(cid))
    fetch(`/api/carts/${cid}/addproducts/${pid}`, {
        method: 'put'
    })
}

async function del(pid, cid){
    console.log('del')
    console.log('pid: ' + pid + ' type: ' + typeof(pid))
    console.log('cid: ' + cid + ' type: ' + typeof(cid))
    await fetch(`/api/carts/${cid}/delproducts/${pid}`, {
        method: 'put'
    })
    location.reload()
}

async function buy(cid){
    console.log(cid)
    /* await fetch(`/api/carts/purchase`, {
        method: 'post'
    }) */
    location.assign('/purchase')
}

async function changeRole(email, role){
    console.log('role: ' + role)
    console.log('email: ' + email)
    await fetch(`/api/users/role/${email}/${role}`, {
        method: 'put'
    })
    location.reload()
}

async function deleteUser(email){
    console.log('delete user')
    console.log('email: ' + email)
    await fetch(`/api/users/${email}`, {
        method: 'delete'
    })
    location.reload()
}