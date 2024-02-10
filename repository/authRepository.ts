import { ServiceResponse } from "../Dtos/ServiceResponseDto";
import { AuthenticationError } from "../errorHandling/AuthenticationError";
import User, { userModel } from "../models/userModel";

// this is authrepository for this purpose 
interface IAuthRepository {
    authenticateUserRepository(userId : string) : Promise<User>;
}


class AuthRepository implements IAuthRepository {
    async authenticateUserRepository(userId: string): Promise<User> {
        let repositoryResponse : User|null = await userModel.findOne({_id : userId});
        if(repositoryResponse === null)
        {
            throw new AuthenticationError("User not Found");
        }

        return repositoryResponse;
    }

}

export default new AuthRepository();