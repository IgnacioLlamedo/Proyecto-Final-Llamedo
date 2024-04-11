import {Schema, model} from "mongoose";
import { randomUUID } from "node:crypto"

const collection = 'users'

const userSchema = new Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'premium'], default: 'user' },
    cartId: { type: String, default: randomUUID },
    lastConnection: { type: Date, default: Date.now() }
}, {
    strict: 'throw',
    versionKey: false,
    methods: {
        public: function(){
            return {
                email: this.email,
                username: this.username
            }
        }
    }
})

export const User = model(collection, userSchema)
