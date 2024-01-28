import mongoose from "mongoose";
import { IdeaCreateRequestDto, IdeaCreateResponseDto } from "../Dtos/IdeaRelatedDtos";
import Idea, { ideaModel } from "../models/ideaModel";
import { NotFoundError } from '../errorHandling/NotFoundError';
import User, { userModel } from '../models/userModel';
import { ConflictError } from "../errorHandling/ConflictError";

// this is repostiory for the authentication related services for this purpose 
interface IIdeaRepository {
    getAllIdeas () : Promise<Array<Idea>>,
    getIdeaById (ideaId : string) : Promise<Idea> ,
    createNewIdea(ideaDetails : IdeaCreateRequestDto) : Promise<IdeaCreateResponseDto>,
    deleteIdeaById(userId : string, ideaId : string) : Promise<string>, 
    saveIdeaByUser(userId : string, ideaId : string) : Promise<string>, 
    upvoteIdeaByUser(userId : string, ideaId : string) : Promise<string>, 
    shareIdeaByUser(userId : string, ideaId : string) : Promise<string>
}

// creating the idea reposioty class for this purpose 
class IdeaRepository implements IIdeaRepository {
    async shareIdeaByUser(userId: string, ideaId: string): Promise<string> {
        let repositoryResponse : string = "";
        // fetching the current user and current idea for this purpose 
        const currUser : User|null = await userModel.findOne({_id : userId});
        const currIdea : Idea|null = await ideaModel.findOne({_id : ideaId});

        // checking whether these exists or not for this purpose 
        if(!currUser)
        {
            throw new NotFoundError("User does not exists.");
        }
        if(!currIdea)
        {
            throw new NotFoundError("Idea does not exist.");
        }

        // otherwise we have to fetch the list of shares 
        let sharedList = currIdea.shared;
        let isPresent : boolean = false;
        // using the for loop for this purpose 
        sharedList.forEach((currShare : mongoose.Types.ObjectId) => {
            if(currShare._id.toString() === userId)
            {
                isPresent = true;
            }
        })
        
        // here we have to implement the same logic as we have done before 
        if(isPresent)
        {
            throw new ConflictError("User already in the shared list.");
        }
        
        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        // here we have to update in the database for this purpose 
        sharedList.push(userIdObjectId);
        const updateResponse = await ideaModel.updateOne({_id : ideaId}, {$set : {
            shared : sharedList
        }});

        console.log("the update response from the database is as follows \n", updateResponse);

        // say everything went fine 
        return repositoryResponse;
    }
    async upvoteIdeaByUser(userId: string, ideaId: string): Promise<string> {
        // here we have to do the same thing which we have done earlier for this puropse 
        // fetching the curruser and curridea for this purpose 
        let repositoryResponse : string = "";
        let currUser : User|null = await userModel.findOne({_id : userId});
        let currIdeaModel : Idea | null = await ideaModel.findOne({_id : ideaId});

        // checking whether they exists or not for this puropse 
        if(!currUser)
        {
            throw new NotFoundError("User does not exists.");
        }
        if(!currIdeaModel)
        {
            throw new NotFoundError("Idea does not exists.");
        }

        // otherwise we have to fetch the current array of the upvotes for this purpose 
        let upvotedList = currIdeaModel.upvotes;
        
        let isPresent :  boolean = false;
        
        // using the for loop to check whether the user has already upvoted or not 
        upvotedList.forEach((currUserId : mongoose.Types.ObjectId) => {
            console.log("the value of the current user id is as follows\n")
            console.log(currUserId);
            if(currUserId._id.toString() === userId)
            {
                isPresent = true;
            }
        });

        if(isPresent)
        {
            // here we have to throw the error for this purpose 
            throw new ConflictError("User has already upvoted the idea.");
        }

        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        upvotedList.push(userIdObjectId);
        
        // now here we have to update the values for this purpose in the database itself 
        const updatedResponse = await ideaModel.updateOne({_id : ideaId}, {$set : {
            upvotes : upvotedList
        }});

        // console.log("the updated value of the response is as follows \n", updatedResponse);
        // say everything went fine
        return repositoryResponse;
    }
    async getAllIdeas(): Promise<Idea[]> {
        let repositoryResponse : Array<Idea> = new Array<Idea>();

        repositoryResponse = await ideaModel.find();
        
        // say everything went fine 
        return repositoryResponse
    }
    
    
    getIdeaById(ideaId: string): Promise<Idea> {
        throw new Error("Method not implemented.");
    }
    

    
    async createNewIdea(ideaDetails: IdeaCreateRequestDto): Promise<IdeaCreateResponseDto> {
        let repositoryResponse : IdeaCreateResponseDto = new IdeaCreateResponseDto();
        let newIdea = new ideaModel({
            _id : new mongoose.Types.ObjectId(), 
            ideaName : ideaDetails.ideaName, 
            ideaDescription : ideaDetails.ideaDescription, 
            createdOn : Date.now(), 
            createdBy : ideaDetails.createdBy, 
            category : ideaDetails.category, 
            rating : ideaDetails.rating, 
            thumbnail : ideaDetails.thumbnail, 
            saved : [], 
            upvotes : [], 
            shared : [], 
            othersKnow : ideaDetails.othersKnow
        });

        await ideaModel.create(newIdea);
        repositoryResponse._id = newIdea._id.toString();
        repositoryResponse.ideaDescription = newIdea.ideaDescription;
        repositoryResponse.ideaName = newIdea.ideaName

        // say eveyrthing went fine 
        return repositoryResponse;
    }


    async deleteIdeaById(userId : string, ideaId: string): Promise<string> {
        // here we have to delete the idea for this puropse 
        // the idea can only be deleted by the user who has created this for this purpose 
        let repositoryResponse = " ";
        console.log("the userid and the idea id is as follows inside the repositoryresponse\n", userId, " ", ideaId);
        const currIdeaDetails = await ideaModel.findOne({_id : ideaId});
        const currUser = await userModel.findOne({_id : userId});
        if(!currIdeaDetails)
        {
            // here we have to throw new error for this puropse 
            throw new NotFoundError("Idea does not exist.");
        }

        if(!currUser)
        {
            throw new NotFoundError("User does not exist.");
        }

        // now we have to check whether the user is same how has created this idewa 
        const createdBy = currIdeaDetails.createdBy;
        console.log("the user which created this idea is as follows \n", createdBy)
        

        // say everything went fine 
        return repositoryResponse;
    }
    
    async saveIdeaByUser(userId: string, ideaId : string): Promise<string> {
        let repositoryResponse = "";

        // here we have to update the ideamodel value for this purpose 
        let currIdeaModel : Idea|null = await ideaModel.findById({_id : ideaId});
        let currUser : User|null = await userModel.findById({_id : userId});
        if(!currIdeaModel)
        {
            throw new NotFoundError("Idea does not exists.");
        }
        else if(!currUser)
        {
            throw new NotFoundError("User not found");
        }

        
        let savedUserIds = currIdeaModel.saved;
        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        let isPresent : boolean = false;

        savedUserIds.forEach((currUserId : mongoose.Types.ObjectId) => {
            if(currUserId._id.toString() === userId.toString())
            {
                isPresent = true;
            }
        });

        if(isPresent)
        {
            throw new ConflictError("User has already Saved the idea.");
        }
    
        savedUserIds.push(userIdObjectId);
        const updateResponse = await ideaModel.updateOne({_id : ideaId}, {$set: {
            saved : savedUserIds
        }});

        repositoryResponse = "Success";
        // say everything went fine 
        return repositoryResponse;
    }
}

export default new IdeaRepository();


