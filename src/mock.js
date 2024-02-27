import { faker } from "@faker-js/faker";
import { Router } from "express";
import { productDao } from "./daos/index.js";

async function createFor(){
    console.log('create')
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
}

async function deleteFor(){
    console.log('delete')
    const products = await productDao.readMany()
    for (const product of products) {
        if (product.category === 'mock'){
            await productDao.deleteOne(product._id)
        }
    }
}

async function createMock(){
    const products = await createFor()
    return products
}

async function deleteMock(){
    const products = await deleteFor()
    return products
}

export const mockingRouter = Router()

mockingRouter.post('/', createMock)

mockingRouter.delete('/delete', deleteMock)