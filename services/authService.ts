// this is the auth service for this purpose where we will manage the authentication of the users 

import { NextFunction } from "express";
import { validateGoogleTokenService } from "./tokenService";
import { AuthenticationError } from "../errorHandling/AuthenticationError";


export const loginService = async (googleToken : string, ) => {
    try {
        const serviceResponse = await validateGoogleTokenService(googleToken as string);
      
        return serviceResponse;
    } catch (error : any) {
        throw new AuthenticationError(error.message);
    }

}