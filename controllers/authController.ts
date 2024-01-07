// this is authentication controller to mention the routes for authentication related functionality for this purpose 

import express , {Express, Response, Request} from "express";
import { validateGoogleTokenService } from "../services/tokenService";

export const loginController = async (req : Request, res : Response) => {

    const authorizationHeader = req.headers.authorization;
    if(authorizationHeader == null)
    {
        // then we have to send that the token is not received and hence send the not found error for this purpose 
        
    }

    const googleToken = authorizationHeader?.split(" ")[1].toString();

    // validating the google token by calling the token service 
    // calling the token service here 
    const serviceResponse = await validateGoogleTokenService(googleToken as string);
    

    res.status(200).json("done");

}