/* import { service as cartService } from "../../src/services/Cart.Service.js";

async function add(pid, cid){
    return await cartService.addProduct(pid, cid)
}

async function del(pid, cid){
    return await cartService.deleteProduct(pid, cid)
} */

``

function add(pid, cid){
    console.log("add")
    console.log("pid: " + pid + " type: " + typeof(pid))
    console.log("cid: " + cid + " type: " + typeof(cid))
    fetch(`/api/carts/${cid}/addproducts/${pid}`, {
        method: 'put'
    })
}

function del(pid, cid){
    console.log("del")
    console.log("pid: " + pid + " type: " + typeof(pid))
    console.log("cid: " + cid + " type: " + typeof(cid))
    fetch(`/api/carts/${cid}/delproducts/${pid}`, {
        method: 'put'
    })
}



