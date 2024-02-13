function add(pid, cid){
    console.log("add")
    console.log("pid: " + pid + " type: " + typeof(pid))
    console.log("cid: " + cid + " type: " + typeof(cid))
    fetch(`/api/carts/${cid}/addproducts/${pid}`, {
        method: 'put'
    })
}

async function del(pid, cid){
    console.log("del")
    console.log("pid: " + pid + " type: " + typeof(pid))
    console.log("cid: " + cid + " type: " + typeof(cid))
    await fetch(`/api/carts/${cid}/delproducts/${pid}`, {
        method: 'put'
    })
    location.reload()
}

async function buy(cid){
    console.log(cid)
    await fetch(`/purchase`, {
        method: 'post'
    })
    location.replace('/purchase')
}

