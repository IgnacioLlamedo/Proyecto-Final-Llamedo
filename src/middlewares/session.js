import session from "express-session";
import { SESSION_SECRET, MONGO_CNX_STR } from "../config.js";
import connectMongo from 'connect-mongo'

const store = connectMongo.create({
    mongoUrl: MONGO_CNX_STR,
    ttl: 60 * 60 * 24
})
export const s = session({
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})
