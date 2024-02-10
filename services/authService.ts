import { AuthenticationError } from "../errorHandling/AuthenticationError";
import User, { userModel } from "../models/userModel";
import mongoose from "mongoose";
import TokenService, { ITokenDecode } from "./tokenService";
import userRepository from "../repository/userRepository";
import { UserCreateRequestDto } from "../Dtos/UserRelatedDtos.dto";
import { NotFoundError } from "../errorHandling/NotFoundError";
import { BadRequestError } from "../errorHandling/BadRequestError";
import { ConflictError } from "../errorHandling/ConflictError";
import { ServerError } from "../errorHandling/ServerError";
import { ServiceResponse } from "../Dtos/ServiceResponseDto";
import tokenService from "./tokenService";
import { ILoginTokenDecode } from "../interfaces";
import authRepository from "../repository/authRepository";




interface IAuthenticationService {
    loginService (googleToken : string) : Promise<ServiceResponse<string>>;
    registerService (googleToken : string) : Promise<ServiceResponse<string>>;
    authenticateUserService (googleToken : string) : Promise<ServiceResponse<User>>
}



class AuthenticationService implements IAuthenticationService {
    async authenticateUserService(googleToken: string): Promise<ServiceResponse<User>> {
        try {
            let serviceResponse = new ServiceResponse<User>();
            const decodeToken : ILoginTokenDecode = await tokenService.decodeTokenService(googleToken);
            const userId : string = decodeToken.id;


            let repositoryResponse = await authRepository.authenticateUserRepository(userId);
            serviceResponse.success = true;
            serviceResponse.message = "Success";
            serviceResponse.data = repositoryResponse;

            // say everything went fine 
            return serviceResponse;
        } catch (error) {
           throw error; 
        }
    }



    async loginService(googleToken: string): Promise<ServiceResponse<string>> {
        try {
            const serviceResponse : ITokenDecode = await TokenService.validateGoogleTokenService(googleToken as string);
            const user : User|null = await userModel.findOne({email : serviceResponse.email});


            let currUser : User|null = user;
            if(user === null)
            {
                // then we have to create a new user for this purpose 
                const newUser= new UserCreateRequestDto(serviceResponse.user, serviceResponse.email);

                const repositoryResponse = await userRepository.createNewUser(newUser)
            }

            

            // now we have to create a new token for this user 
            const loginToken = await TokenService.getLoginTokenService(currUser as User);

            let serviceResponse2 = new ServiceResponse<string>();
            serviceResponse2.success = true;
            serviceResponse2.message = "Success";
            serviceResponse2.data = loginToken;
            return serviceResponse2;

        } catch (error : any) {
            if(error instanceof NotFoundError)
            {
                throw new NotFoundError(error.message);
            }
            else if(error instanceof AuthenticationError)
            {
                throw new AuthenticationError(error.message);

            }
            else if(error  instanceof BadRequestError)
            {
                throw new BadRequestError(error.message);
            }
            else if(error instanceof ConflictError)
            {
                throw new ConflictError(error.message);
            }
            else
            {
                throw new ServerError("Something went wrong on the server side \n");
            }
        }
    }



    async registerService(googleToken: string): Promise<ServiceResponse<string>> {
        let serviceResponse = new ServiceResponse<string>();
        return serviceResponse;
    }

    

}

export default new AuthenticationService;