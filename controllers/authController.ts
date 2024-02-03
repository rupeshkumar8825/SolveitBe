// this is authentication controller to mention the routes for authentication related functionality for this purpose 

import express , {Express, Response, Request, NextFunction} from "express";
import { NotFoundError } from "../errorHandling/NotFoundError";
import AuthenticationService from "../services/authService";

// using the class based controllers here 
class AuthController {
    async login (req : Request, res : Response, next : NextFunction) : Promise<void>  {
        // const authorizationHeader = req.headers.authorization;

        // if(authorizationHeader == null)
        // {
        //     throw new NotFoundError("Token Not Found.");
        // }

        // otherwise we have to fetch the value of the token 
        // const googleToken = authorizationHeader?.split(" ")[1].toString();
        console.log("the request body is as follows \n", req.body);
        const googleToken = req.body.googleToken;

        if(googleToken === "" || googleToken === null)
        {
            throw new NotFoundError("Token Not Found");
        }


        try {

            const serviceResponse = await AuthenticationService.loginService(googleToken);
            res.cookie("token", serviceResponse.data, {httpOnly : true, maxAge : 10 * 1000});
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error);       
        }

    }

    async authenticateUserController (req : Request, res : Response, next : NextFunction) : Promise<void> {
        console.log("inside the authenticate user controller to check whether the user is correct or not\n");
        // here we have to use the trycatch block for this purpose 
        try {
            // inside this we have to call the service to find the user with this token 
            // const clientToken : string | undefined = req.headers
            console.log("the request headers consists of the following things\n", req);
            return;
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController;