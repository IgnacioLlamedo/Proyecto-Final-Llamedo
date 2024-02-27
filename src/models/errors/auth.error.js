import { errorTypes } from "./types.js";

export class AuthError extends Error{
    constructor(){
        super('Authentication Error')
        this.type = errorTypes.AUTH_ERROR
    }
}