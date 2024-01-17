import mongoose from "mongoose";
import { randomUUID } from "node:crypto"
import { hash, compareHash } from "../utils/crypt.js";
import { adminPermission, isAdmin } from "../middlewares/auth.js";

const collection = 'users'

const userSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user'}
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
    },
    statics: {
        register: async function (reqBody){
            reqBody.password = hash(reqBody.password)
            const newUser = await mongoose.model(collection).create(reqBody)
            const userData = {
                email: newUser.email,
                username: newUser.username,
                role: 'user',
            }
            return userData
        },
        authenticate: async function(username, password){
            let userData
            if (isAdmin(username, password)){
                userData = {
                    email: 'adminCoder@coder.com',
                    username: 'admin',
                    role: 'admin'
                }
            }
            else {
                const user = await mongoose.model(collection).findOne({ email: username }).lean()
                if(!user){
                    throw new Error('Login failed')
                }
                if(!compareHash(password, user['password'])){
                    throw new Error('Login failed')
                }
                userData = {
                    email: user['email'],
                    username: user['username'],
                    role: 'user'
                }
            }
            if(!userData){
                throw new Error('Login failed')
            }
            console.log(userData)
            return userData
        },
        resetPass: async function(email, password){
            const newPass = hash(password)
            const updated = await mongoose.model(collection).findOneAndUpdate(
                { email },
                { $set: { password: newPass } },
                { new: true }
            ).lean()
            if(!updated){
                throw new Error('Failed resetting password')
            }
            return{
                email: updated['email'],
                username: updated['username'],
                role: 'user'
            }
        },
        list: async query => {
            return await mongoose.model(collection).find(query).lean()
        }
    }
})

export const User = mongoose.model(collection, userSchema)
