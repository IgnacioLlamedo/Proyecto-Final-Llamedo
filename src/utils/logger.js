import config from "../config.js";
import winston from "winston";

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
}

const winstonLoggerDev = winston.createLogger({
    levels: levels,
    transports: [
        new winston.transports.Console({
            level: 'debug'
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'errors.log'
        })
    ]
})

const winstonLoggerProd = winston.createLogger({
    levels: levels,
    transports: [
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'errors.log'
        })
    ]
})

export let logger
if(config.nodeEnv === 'development'){
    logger = winstonLoggerDev
    logger.info('dev')
}
else{
    logger = winstonLoggerProd
    logger.info('prod')
}
