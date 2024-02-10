import mongoose from "mongoose";
import User, { userModel } from "../models/userModel";
import { UserCreateRequestDto } from "../Dtos/UserRelatedDtos.dto";



interface IUserRepository {
    createNewUser (newUser : UserCreateRequestDto) : Promise<boolean >, 
    deleteUser (userId : string) : Promise<boolean>, 
    upadteUser (uesrId : string, updatedDetails : User) : Promise<boolean>, 
    getUserDetails(userId : string) : Promise<User | null>, 
    getAllUsers() : Promise<Array<User>>
};




class UserRepository implements IUserRepository {
    async createNewUser(newUser: UserCreateRequestDto): Promise<boolean> {
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



    upadteUser(userId: string, updatedDetails: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }



    async getUserDetails(userId: string): Promise<User | null> {
        let repositoryResponse = await userModel.findOne({_id : userId.toString()});
        // say everything went fine 
        return repositoryResponse;
    }


    
    async getAllUsers(): Promise<User[]> {
        let repositoryResponse : Array<User> = await userModel.find();
        // say everything went fine 
        return repositoryResponse;
    }

}

export default new UserRepository();