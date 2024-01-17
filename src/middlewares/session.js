import session from "express-session";
import config from "../config.js";
import connectMongo from 'connect-mongo'

console.log(config)

const store = connectMongo.create({
    mongoUrl: config.cnxStr,
    ttl: 60 * 60 * 24
})
export const s = session({
    store,
    secret: config.ssnSec,
    resave: false,
    saveUninitialized: false
})
