import { CustomError } from "./customError";

// this is not found error for this purpose 
export class NotFoundError extends CustomError {
    constructor(message : string, user = {})
    {
        super(message, user, "NOTFOUNDERRORA");
    }
}