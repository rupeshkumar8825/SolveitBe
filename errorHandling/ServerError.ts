import { CustomError } from "./customError";

// this is the server error for this purpose 
export class ServerError extends CustomError {
    constructor(message : string, user = {})
    {
        super(message, user, "SERVERERROR");
    }
}