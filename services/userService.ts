import { ServiceResponse } from "../Dtos/ServiceResponseDto";
import User from "../models/userModel";
import userRepository from "../repository/userRepository";

// this is user related services for this purpose 
interface IUserService {
    getAllUsersService () : Promise<ServiceResponse<Array<User>>>, 
};

// defining the userservice class here that will implement the above interface for this purpose 
class UserService implements IUserService {
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