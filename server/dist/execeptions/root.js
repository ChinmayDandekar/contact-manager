// message, status code, error codes, error
export class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCode[ErrorCode["INCORRECT_EMAIL"] = 1004] = "INCORRECT_EMAIL";
    ErrorCode[ErrorCode["INVALID_OTP"] = 1005] = "INVALID_OTP";
    ErrorCode[ErrorCode["INCORRECT_QUERY"] = 1006] = "INCORRECT_QUERY";
    ErrorCode[ErrorCode["CONTACT_ALREADY_EXISTS"] = 5001] = "CONTACT_ALREADY_EXISTS";
    ErrorCode[ErrorCode["REPORT_ALREADY_EXISTS"] = 5002] = "REPORT_ALREADY_EXISTS";
    ErrorCode[ErrorCode["PHONE_NOT_FOUND"] = 5003] = "PHONE_NOT_FOUND";
    ErrorCode[ErrorCode["CONTACT_NOT_FOUND"] = 5004] = "CONTACT_NOT_FOUND";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 2001] = "UNPROCESSABLE_ENTITY";
    ErrorCode[ErrorCode["INTERNAL_EXECPTION"] = 3001] = "INTERNAL_EXECPTION";
    ErrorCode[ErrorCode["UNAUTHRORIZED"] = 4001] = "UNAUTHRORIZED";
})(ErrorCode || (ErrorCode = {}));
