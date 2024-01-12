import { AuthenticationError } from "../errorHandling/AuthenticationError";
import User, { userModel } from "../models/userModel";
import mongoose from "mongoose";
import TokenService, { ITokenDecode } from "./tokenService";

// defining the interface of the authentication service in order to decouple the services from the controller 
// also using this we will be able to use the dependency injection for this purpose 
interface IAuthenticationService {
    loginService (googleToken : string) : Promise<string>;
    registerService (googleToken : string) : Promise<string>;
}

// using the class based implementation of the auth servive for this purpose 
class AuthenticationService implements IAuthenticationService {
    async loginService(googleToken: string): Promise<string> {
        console.log("came inside the authentication service inside the login function for this purpose \n");

        // here we have to use the auth repository if needed at all for this purpose 
        try {
            const serviceResponse : ITokenDecode = await TokenService.validateGoogleTokenService(googleToken as string);
            // here we have to check whether the user  is already present in the database or not 
            const user : User|null = await userModel.findOne({email : serviceResponse.email});
            let currUser : User|null = user;
            if(user === null)
            {
                // then we have to create a new user for this purpose 
                currUser = new userModel <User>({
                    _id : new mongoose.Types.ObjectId(), 
                    userName : serviceResponse.user as string, 
                    email : serviceResponse.email as string
                });
    
                console.log("the new user that i am going to create is as follows \n", currUser);
                // we have to save this for this purpose 
                // await currUser.save();
    
            }
    
            // now we have to create a new token for this user 
            const loginToken = await TokenService.getLoginTokenService(currUser as User);

            return loginToken;
        } catch (error : any) {
            throw new AuthenticationError(error.message);
        }
        // say everything went fine 
        return "";
    }
    async registerService(googleToken: string): Promise<string> {
        console.log("inside the authentication service and register function for this purpose .");

        return "";
    }

}

export default new AuthenticationService;
// following is the implementation of the login service 
// this login service is dependent on the token service also which we will see in the code below for this purpopse 
// export const loginService = async (googleToken : string, ) => {
//     try {
//         const serviceResponse = await validateGoogleTokenService(googleToken as string);
//         // here we have to check whether the user  is already present in the database or not 
//         const user = await userModel.findOne({email : serviceResponse.email});
//         let currUser : User| null = user;
//         if(user === null)
//         {
//             // then we have to create a new user for this purpose 
//             currUser = new userModel <User>({
//                 _id : new mongoose.Types.ObjectId(), 
//                 userName : serviceResponse.name as string, 
//                 email : serviceResponse.email as string
//             });

//             console.log("the new user that i am going to create is as follows \n", currUser);
//             // we have to save this for this purpose 
//             // await currUser.save();

//         }

//         // now we have to create a new token for this user 
//         const loginToken = await getLoginTokenService(currUser as User);
//         return serviceResponse;
//     } catch (error : any) {
//         throw new AuthenticationError(error.message);
//     }

// }