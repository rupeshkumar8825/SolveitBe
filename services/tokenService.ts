import User, { userModel } from './../models/userModel';
// this is the service related to handling the tokens for the  solveit application for this purpose 
// const O{}

import { OAuth2Client } from "google-auth-library"
import { AuthenticationError } from "../errorHandling/AuthenticationError";

export const validateGoogleTokenService = async (googleToken : string) => {
    const client = new OAuth2Client();

    console.log("inside the validate google token service for this purpose \n\n\n");
    const tokenValidation = await client.verifyIdToken({
        idToken : googleToken, 
        audience : process.env.CLIENT_ID
    });

    if(tokenValidation == null)
    {
        throw new AuthenticationError("Validation failed");
    }

    // now here we have to do the validation for this purpose 
    const payload = tokenValidation.getPayload();
    console.log("the payload value is as follows \n", payload);
    
    const userEmail = payload?.email;
    const emailVerified = payload?.email_verified;
    const name = payload?.name;
    // say everything went fine 
    return {email : userEmail, name : name};
}


// defining the service for creating a new token for this user 
export const getLoginTokenService = (currUser : User) => {
    console.log("the value of the current current user that was passed by the login service to the token service is as follows \n", currUser);

    
    console.log("inside the get token service module.")
}