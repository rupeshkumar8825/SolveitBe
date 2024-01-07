import { CustomError } from "./customError";

// this is not found error for this purpose 
export class BadRequestError extends CustomError {
    constructor(message : string, user = {})
    {
        super(message, user, "BADREQUESTERROR");
    }
}