import { CustomError } from "./customError";

// this is not found error for this purpose 
export class ConflictError extends CustomError {
    constructor(message : string, user = {})
    {
        super(message, user, "CONFLICTERROR");
    }
}