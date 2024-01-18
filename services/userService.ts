import { ServiceResponse } from "../Dtos/ServiceResponseDto";
import User from "../models/userModel";

// this is user related services for this purpose 
interface IUserService {
    getAllUsersService () : Promise<ServiceResponse<Array<User>>>, 
};

// defining the userservice class here that will implement the above interface for this purpose 
class UserService implements IUserService {
    async getAllUsersService(): Promise<ServiceResponse<User[]>> {
        let serviceResponse : ServiceResponse<Array<User>> = new ServiceResponse([], "", false); 
        console.log("inside the user service ");

        // say everything went fine 
        return serviceResponse;
    }

}

export default new UserService();