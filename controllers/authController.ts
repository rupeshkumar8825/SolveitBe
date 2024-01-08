// this is authentication controller to mention the routes for authentication related functionality for this purpose 

import express , {Express, Response, Request, NextFunction} from "express";
import { validateGoogleTokenService } from "../services/tokenService";
import { NotFoundError } from "../errorHandling/NotFoundError";
import { loginService } from "../services/authService";

export const loginController = async (req : Request, res : Response, next : NextFunction) => {

    const authorizationHeader = req.headers.authorization;
    if(authorizationHeader == null)
    {
        throw new NotFoundError("Token Not Found.");
    }

    const googleToken = authorizationHeader?.split(" ")[1].toString();

    if(googleToken === "" || googleToken === null)
    {
        throw new NotFoundError("Token Not Found");
    }


    try {

        const serviceResponse = await loginService(googleToken);
        console.log("the response from the login service is as follows \n", serviceResponse);
        res.status(200).json(serviceResponse);
    } catch (error) {
        next(error);       
    }
    


}