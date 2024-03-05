import { logger } from "../../utils/logger.js";
import { errorTypes } from "./types.js";

export class AuthError extends Error{
    constructor(){
        logger.error(`Authentication Error - ${new Date().toLocaleTimeString()}`)
        super('Authentication Error')
        this.type = errorTypes.AUTH_ERROR
    }
}