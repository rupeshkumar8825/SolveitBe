import { CustomError } from "./customError";

export class UnAuthorizedError extends CustomError{
    constructor(message : string, user = {})
    {
        super(message, user, "UNAUTHORIZED");
    }
}

