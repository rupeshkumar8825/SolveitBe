// this is authentication controller to mention the routes for authentication related functionality for this purpose 

import express , {Express, Response, Request, NextFunction} from "express";
import { NotFoundError } from "../errorHandling/NotFoundError";
import AuthenticationService from "../services/authService";

// using the class based controllers here 
class AuthController {
    // inside we will be implementing the two functions 
    async login (req : Request, res : Response, next : NextFunction) : Promise<void>  {
        console.log('inside the login function of auth controller for this purpose \n');

        // fetching the body data from the request 
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
            console.log("the response from the login service is as follows \n", serviceResponse);
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error);       
        }

    }
}

export default new AuthController;

// export const loginController = async (req : Request, res : Response, next : NextFunction) => {

//     const authorizationHeader = req.headers.authorization;
//     if(authorizationHeader == null)
//     {
//         throw new NotFoundError("Token Not Found.");
//     }

//     const googleToken = authorizationHeader?.split(" ")[1].toString();

//     if(googleToken === "" || googleToken === null)
//     {
//         throw new NotFoundError("Token Not Found");
//     }


//     try {

//         const serviceResponse = await loginService(googleToken);
//         console.log("the response from the login service is as follows \n", serviceResponse);
//         res.status(200).json(serviceResponse);
//     } catch (error) {
//         next(error);       
//     }
    


// }