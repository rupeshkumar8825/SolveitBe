import mongoose from "mongoose";
import { ServiceResponse } from "../Dtos/ServiceResponseDto";
import { NotFoundError } from "../errorHandling/NotFoundError";
import User from "../models/userModel";
import userRepository from "../repository/userRepository";

interface IUserService {
    getAllUsersService () : Promise<ServiceResponse<Array<User>>>, 
    getUserDetailsByIdService (userId : string) : Promise<ServiceResponse<User | null>>
};



class UserService implements IUserService {
    async getUserDetailsByIdService(userId: string): Promise<ServiceResponse<User | null>> {
        try {
            if(!mongoose.Types.ObjectId.isValid(userId))
            {
                throw new NotFoundError("User Id is not Valid");
            }


            let serviceResponse : ServiceResponse<User | null> = new ServiceResponse<User | null>(null, "", false);
            let response = await userRepository.getUserDetails(userId);
            if(!response){
                throw new NotFoundError("User does Not exist.");
            }


            serviceResponse.data = response;
            serviceResponse.message = "Success";
            serviceResponse.success = true;


            // say everything went fine 
            return serviceResponse;
            
        } catch (error) {
            throw error;
        }
    }


    

    async getAllUsersService(): Promise<ServiceResponse<User[]>> {
        try {
            let serviceResponse : ServiceResponse<Array<User>> = new ServiceResponse([], "", false); 
            serviceResponse.data = await userRepository.getAllUsers();
            serviceResponse.message = "success";
            serviceResponse.success = true;
            // say everything went fine 
            return serviceResponse;
            
        } catch (error) {
            throw error;            
        }
    }

}

export default new UserService();