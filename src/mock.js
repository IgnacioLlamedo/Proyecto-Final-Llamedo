import { faker } from "@faker-js/faker";
import { Router } from "express";
import { productDao } from "./daos/index.js";
import { logger } from "./utils/logger.js";

async function createFor(){
    logger.debug('create')
    for (let i = 0; i < 100; i++) {
        await productDao.create({
            title: faker.commerce.productName(),
            description: 'description',
            code: faker.database.mongodbObjectId(),
            price: faker.commerce.price(),
            stock: faker.number.int({min: 1, max: 100}),
            category: 'mock'
        })
    }
    return await productDao.readMany()
}

async function deleteFor(){
    logger.debug('delete')
    const products = await productDao.readMany()
    for (const product of products) {
        if (product.category === 'mock'){
            await productDao.deleteOne(product._id)
        }
    }
    return await productDao.readMany()
}

async function createMock(req, res, next){
    try{
        res.json(await createFor())
    }
    catch(error){
        next(error)
    }
}

async function deleteMock(req, res, next){
    try{
        res.json(await deleteFor())
    }
    catch(error){
        next(error)
    }
}

export const mockingRouter = Router()

mockingRouter.post('/', createMock)

mockingRouter.delete('/', deleteMock)