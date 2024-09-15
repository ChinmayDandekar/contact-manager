import { HttpException } from "./root.js";
export class UnauthorizedException extends HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 401, null);
    }
}
