import { getLoginTokenService, validateGoogleTokenService } from "./tokenService";
import { AuthenticationError } from "../errorHandling/AuthenticationError";
import User, { userModel } from "../models/userModel";
import mongoose from "mongoose";


// following is the implementation of the login service 
// this login service is dependent on the token service also which we will see in the code below for this purpopse 
export const loginService = async (googleToken : string, ) => {
    try {
        const serviceResponse = await validateGoogleTokenService(googleToken as string);
        // here we have to check whether the user  is already present in the database or not 
        const user = await userModel.findOne({email : serviceResponse.email});
        let currUser : User| null = user;
        if(user === null)
        {
            // then we have to create a new user for this purpose 
            currUser = new userModel <User>({
                _id : new mongoose.Types.ObjectId(), 
                userName : serviceResponse.name as string, 
                email : serviceResponse.email as string
            });

            console.log("the new user that i am going to create is as follows \n", currUser);
            // we have to save this for this purpose 
            // await currUser.save();

        }

        // now we have to create a new token for this user 
        const loginToken = await getLoginTokenService(currUser as User);
        return serviceResponse;
    } catch (error : any) {
        throw new AuthenticationError(error.message);
    }

}