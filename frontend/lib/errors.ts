// ErrorCode enum as provided
export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    INCORRECT_EMAIL = 1004,
    INVALID_OTP = 1005,
    INCORRECT_QUERY = 1006,
    CONTACT_ALREADY_EXISTS = 5001,
    REPORT_ALREADY_EXISTS = 5002,
    PHONE_NOT_FOUND = 5003,
    CONTACT_NOT_FOUND = 5004,
    UNPROCESSABLE_ENTITY = 2001,
    INTERNAL_EXCEPTION = 3001,
    UNAUTHORIZED = 4001,
}

// Object mapping error codes to user-friendly messages
const errorMessages: { [key in ErrorCode]: string } = {
    [ErrorCode.USER_NOT_FOUND]: "User not found. Please check your credentials.",
    [ErrorCode.USER_ALREADY_EXISTS]: "A user with this email already exists.",
    [ErrorCode.INCORRECT_PASSWORD]: "The password you entered is incorrect.",
    [ErrorCode.INCORRECT_EMAIL]: "The email address you entered is invalid.",
    [ErrorCode.INVALID_OTP]: "The OTP you entered is invalid.",
    [ErrorCode.INCORRECT_QUERY]: "The query you entered is incorrect.",
    [ErrorCode.CONTACT_ALREADY_EXISTS]: "The contact already exists in your records.",
    [ErrorCode.REPORT_ALREADY_EXISTS]: "The report has already been submitted.",
    [ErrorCode.PHONE_NOT_FOUND]: "The phone number was not found in our system.",
    [ErrorCode.CONTACT_NOT_FOUND]: "The contact was not found in your records.",
    [ErrorCode.UNPROCESSABLE_ENTITY]: "The request could not be processed. Please try again.",
    [ErrorCode.INTERNAL_EXCEPTION]: "An internal error occurred. Please try again later.",
    [ErrorCode.UNAUTHORIZED]: "You are not authorized to perform this action.",
};

// Function to get error message by code
export const  getErrorMessage = (errorCode: ErrorCode): string => {
    return errorMessages[errorCode] || "An unknown error occurred.";
}

// // Example usage
// const errorCodeFromBackend = ErrorCode.USER_NOT_FOUND;
// const errorMessage = getErrorMessage(errorCodeFromBackend);
// console.log(errorMessage); // Output: "User not found. Please check your credentials."
