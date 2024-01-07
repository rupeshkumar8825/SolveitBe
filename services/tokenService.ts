// this is the service related to handling the tokens for the  solveit application for this purpose 
// const O{}

import { OAuth2Client } from "google-auth-library"

export const validateGoogleTokenService = async (googleToken : string) => {
    // here we have to validate the google token whether this is coming from the correct application or not 
    // we will see whether this user is inside the database or not 
    // if it not present then we will automatically register this user into the database and then send the access token to the user for this purpose 
    const client = new OAuth2Client();

    const tokenValidation = await client.verifyIdToken({
        idToken : googleToken, 
        audience : process.env.CLIENT_ID
    });


    console.log("the value of the tokevalidation is as follows \n", tokenValidation);
}