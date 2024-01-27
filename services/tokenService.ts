import User, { userModel } from './../models/userModel';
import * as jwt from "jsonwebtoken";
// this is the service related to handling the tokens for the  solveit application for this purpose 
// const O{}

import { OAuth2Client } from "google-auth-library"
import { AuthenticationError } from "../errorHandling/AuthenticationError";
import AppConfig from '../config/appConfig';
import { ILoginTokenDecode } from '../interfaces';

export interface ITokenDecode{
    user : string, 
    email : string
};


// defining the interface for token service 
interface ITokenService {
    validateGoogleTokenService(googleToken : string) : Promise<ITokenDecode>, 
    getLoginTokenService(currUser : User) : Promise<string>
    decodeTokenService(token : string) : Promise<ILoginTokenDecode>
};


// using the class based implementation for this purpose 
class TokenService implements ITokenService {
    async decodeTokenService(token: string): Promise<ILoginTokenDecode> {
        // here we have to decode the token for this purpose 
        const decoded : jwt.JwtPayload= await jwt.verify(token as string, AppConfig.app.secret) as jwt.JwtPayload;
        const serviceResponse : ILoginTokenDecode = {
            id : decoded._id as string, 
            email : decoded.email as string , 
            exp : decoded.exp as number 
        };

        
        // say everything went fine 
        return serviceResponse;
        
    }

    async validateGoogleTokenService(googleToken: string): Promise<ITokenDecode> {
        const client = new OAuth2Client();

        const tokenValidation =await client.verifyIdToken({
            idToken : googleToken, 
            audience : AppConfig.app.clientId
        });
        
        if(tokenValidation == null)
        {
            console.log("the token validation was not succesfully hence sending the error response in return for this purpose \n");
            throw new AuthenticationError("Token Validation Failed!");
        }
        
        // now here we have to do the validation for this purpose 
        const payload = tokenValidation.getPayload();
        console.log("the payload value is as follows \n", payload);
        
        const userEmail = payload?.email;
        const emailVerified = payload?.email_verified;
        const name = payload?.name;

        if(!name || !userEmail)
        {
            // token validation again failed 
            throw new AuthenticationError("Token Validation Failed.");
        }


        // say everything went fine 
        let response : ITokenDecode = {
            user : name as string, 
            email : userEmail as string
        };


        return response;
    }


    async getLoginTokenService(currUser: User): Promise<string> {
        const expirationTime = Math.floor(Date.now() / 1000) + 300; // 2 minutes in seconds

        const newToken = jwt.sign({_id : currUser._id, email : currUser.email}, AppConfig.app.secret, {expiresIn : expirationTime});
        
        return newToken;
    }

}


export default new TokenService();