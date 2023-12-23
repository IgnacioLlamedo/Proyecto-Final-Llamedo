import mongoose from "mongoose";
import { randomUUID } from "node:crypto"

const collection = 'users'

const userSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    mail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true }
}, {
    strict: 'throw',
    versionKey: false
})

export const userManager = mongoose.model(collection, userSchema)
