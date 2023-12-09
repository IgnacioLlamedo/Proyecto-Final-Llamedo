
const socket = io()

document.querySelector('form')?.addEventListener('submit', event => {
    event.preventDefault()
    try {
        const pTitle = document.getElementById('pTitle').value
        const pDescription = document.getElementById('pDescription').value
        const pCode = document.getElementById('pCode').value
        const pPrice = document.getElementById('pPrice').value
        const pStock = document.getElementById('pStock').value
        const pCategory = document.getElementById('pCategory').value
        const pThumbnails = document.getElementById('pThumbnails').value
        if (!pTitle || !pDescription || !pCode || !pPrice || !pStock || !pCategory || !pThumbnails) {
            throw new Error('All fields are necessary')
        }
        const newProduct = {
            title: pTitle,
            description: pDescription,
            code: pCode,
            price: parseFloat(pPrice),
            stock: parseInt(pStock),
            category: pCategory,
            thumbnails: pThumbnails
        }
        socket.emit('addProduct', newProduct)
        document.getElementById('pTitle').value = ''
        document.getElementById('pDescription').value = ''
        document.getElementById('pCode').value = ''
        document.getElementById('pPrice').value = ''
        document.getElementById('pStock').value = ''
        document.getElementById('pCategory').value = ''
        document.getElementById('pThumbnails').value = ''
    }
    catch (error) {
        console.log(error.message)
    }
})

socket.on('update', ( products ) => {
    const UL = document.querySelector('#productsUL')
    UL.innerHTML = ``
    for (const product of products) {
        const DIV = document.createElement('div')
        DIV.innerHTML = `
            <p>Product ${product.title}</p>
            <li>Id : ${product.id}</li>
            <li>Description : ${product.description}</li>
            <li>Code : ${product.code}</li>
            <li>Price : ${product.price}</li>
            <li>Status : ${product.status}</li>
            <li>Stock : ${product.stock}</li>
            <li>Category : ${product.category}</li>
            <li>Thumbnails : ${product.thumbnails}</li>
            `
        UL.appendChild(DIV)
    }
})

            
