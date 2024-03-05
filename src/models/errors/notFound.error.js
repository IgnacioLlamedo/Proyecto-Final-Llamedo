import { logger } from "../../utils/logger.js";
import { errorTypes } from "./types.js";

export class NotFoundError extends Error{
    constructor(entity){
        logger.error(`${entity} Not Found - ${new Date().toLocaleTimeString()}`)
        super(entity + ' Not Found')
        this.type = errorTypes.NOT_FOUND_ERROR
    }
}

