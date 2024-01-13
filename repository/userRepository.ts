// this is repository for the user related functionalities 
// the repository is basically used in order to avoid the proper coupling with the database implementation 
// this way we will be able to easily shift to the other implementation 
// we have to define the interfaces and then we can have multilple implementation of the same interfaces for this purpose 

import mongoose from "mongoose";
import User, { userModel } from "../models/userModel";
import { UserCreateRequestDto } from "../Dtos/UserRelatedDtos.dto";

interface IUserRepository {
    createNewUser (newUser : UserCreateRequestDto) : Promise<boolean >, 
    deleteUser (userId : string) : Promise<boolean>, 
    upadteUser (uesrId : string, updatedDetails : User) : Promise<boolean>, 
    getUserDetails(userId : string) : Promise<User>, 
    getAllUsers() : Promise<Array<User>>
};

// now we have to implement all this interfaces for this purpose 
class UserRepository implements IUserRepository {
    async createNewUser(newUser: UserCreateRequestDto): Promise<boolean> {
        console.log("inside the create new use repository for this puropse \n");
        const currUser = new userModel <User>({
        _id : new mongoose.Types.ObjectId(), 
        userName : newUser.userName as string, 
        email : newUser.email as string
        });

        // here we have to save this into db for this purpose 
        const repositoryResponse = await userModel.create(currUser);
        return true;
    }


    deleteUser(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    upadteUser(uesrId: string, updatedDetails: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getUserDetails(userId: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getAllUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}

export default new UserRepository();