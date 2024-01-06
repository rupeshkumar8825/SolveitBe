import { CustomError } from "./customError";
export class AuthenticationError extends CustomError {
    constructor(message : string, user = {})
    {
        super(message, user, "AUTHENTICATION");

    }
}
