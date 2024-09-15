import { ErrorCode, HttpException } from "./execeptions/root.js";
import { InternalException } from "./execeptions/internal-exception.js";
// Generic Error Handler
export const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            await method(req, res, next);
        }
        catch (error) {
            let exception;
            if (error instanceof HttpException) {
                exception = error;
            }
            else {
                exception = new InternalException('Something Went Wrong', error, ErrorCode.INTERNAL_EXECPTION);
            }
            next(exception);
        }
    };
};
