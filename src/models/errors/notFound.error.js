import { errorTypes } from "./types.js";

export class NotFoundError extends Error{
    constructor(entity){
        super(entity + ' Not Found')
        this.type = errorTypes.NOT_FOUND_ERROR
    }
}

