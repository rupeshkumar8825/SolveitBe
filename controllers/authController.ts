// this is authentication controller to mention the routes for authentication related functionality for this purpose 

import express , {Express, Response, Request, NextFunction} from "express";
import { NotFoundError } from "../errorHandling/NotFoundError";
import AuthenticationService from "../services/authService";

// using the class based controllers here 
class AuthController {
    async login (req : Request, res : Response, next : NextFunction) : Promise<void>  {
        const authorizationHeader = req.headers.authorization;

        if(authorizationHeader == null)
        {
            throw new NotFoundError("Token Not Found.");
        }

        // otherwise we have to fetch the value of the token 
        const googleToken = authorizationHeader?.split(" ")[1].toString();

        if(googleToken === "" || googleToken === null)
        {
            throw new NotFoundError("Token Not Found");
        }


        try {

            const serviceResponse = await AuthenticationService.loginService(googleToken);
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error);       
        }

    }
}

export default new AuthController;