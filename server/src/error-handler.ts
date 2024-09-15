import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./execeptions/root.js"
import { InternalException } from "./execeptions/internal-exception.js"


// Generic Error Handler
export const errorHandler = (method: Function) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error:any) {
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error
            } else {
                exception = new InternalException('Something Went Wrong',error, ErrorCode.INTERNAL_EXECPTION)
            }
            next(exception)
        }
    }
}