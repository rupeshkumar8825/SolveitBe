import User, { userModel } from './../models/userModel';
// this is the service related to handling the tokens for the  solveit application for this purpose 
// const O{}

import { OAuth2Client } from "google-auth-library"
import { AuthenticationError } from "../errorHandling/AuthenticationError";
import AppConfig from '../config/appConfig';

export interface ITokenDecode{
    user : string, 
    email : string
};


// defining the interface for token service 
interface ITokenService {
    validateGoogleTokenService(googleToken : string) : Promise<ITokenDecode>, 
    getLoginTokenService(currUser : User) : Promise<string>
};


// using the class based implementation for this purpose 
class TokenService implements ITokenService {

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
        console.log("here we have to return the new token for this user to the authservice for this purpose \n");
        return "";
    }

}


export default new TokenService();