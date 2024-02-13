import {Schema, model} from "mongoose"
import { randomUUID } from "crypto"

const collection = 'products'

const ticketSchema = new Schema({
    _id: { type: String, default : randomUUID },
    code: { type: String, required: true },
    purchase_datetime: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
}, {
    versionKey: false,
    strict: 'throw'
})

export const Ticket = model(collection, ticketSchema)
