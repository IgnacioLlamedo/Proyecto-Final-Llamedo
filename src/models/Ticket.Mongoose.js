import {Schema, model} from "mongoose"
import { randomUUID } from "crypto"

const collection = 'tickets'

const ticketSchema = new Schema({
    _id: { type: String, default : randomUUID },
    code: { type: String, default: randomUUID },
    purchase_datetime: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
}, {
    versionKey: false,
    strict: 'throw'
})

export const Ticket = model(collection, ticketSchema)
