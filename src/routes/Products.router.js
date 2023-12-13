import { Router } from "express"
import { pm } from "../ProductManager.js"
import { dbProducts } from "../models/ProductMongoose.js"

export const productsRouter = Router()

productsRouter.get('/:query', async (req, res) => {
    try {
        const filter = req.query.category ? { category: req.query.category } : {}
        const pagination = { limit: req.query.limit || 10, page: req.query.page || 1, sort: req.query.sort, lean: true }
        let params;
        if (req.query.sort === 'asc') {
            params = await dbProducts.paginate(filter, { ...pagination, sort: { price: 1 } });
        } else if (req.query.sort === 'desc') {
            params = await dbProducts.paginate(filter, { ...pagination, sort: { price: -1 } });
        } else {
            params = await dbProducts.paginate(filter, pagination);
        }

        const data = {
            status: 'succes',
            payload: params.docs,
            totalPages: params.totalPages,
            prevPage: params.prevPage,
            nextPage: params.nextPage,
            page: params.page,
            hasPrevPage: params.hasPrevPage,
            hasNextPage: params.hasNextPage,
            prevLink: '',
            nextLink: ''
        }
        res.render('product', data)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try {
        const search = await pm.findById(req.params['pid'])
        res.json({ Product: search })
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const { title, descrption, code, price, stoc, category, thumbnail } = req.body
        const productData = await pm.createProduct({ title, descrption, code, price, stoc, category, thumbnail })
        res.json(productData)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const { title, descrption, code, price, stoc, category, thumbnail } = req.body
        const update = await pm.update(pid, { title, descrption, code, price, stoc, category, thumbnail })
        res.json(update)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        await pm.delete(pid)
        res.json(`Product ${ pid } deleted`)
    }
    catch (error) {
        res.json({
            status: "error",
            message: error.message
        }) 
    }
})
