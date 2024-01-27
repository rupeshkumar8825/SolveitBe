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
    deleteIdeaById(ideaId : string) : Promise<string>, 
    saveIdeaByUser(userId : string, ideaId : string) : Promise<string>
}

// creating the idea reposioty class for this purpose 
class IdeaRepository implements IIdeaRepository {
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


    deleteIdeaById(ideaId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
    async saveIdeaByUser(userId: string, ideaId : string): Promise<string> {
        let repositoryResponse = "";

        // here we have to update the ideamodel value for this purpose 
        console.log("fetching the value of the ideamodel using the id for this puropse \n");
        let currIdeaModel : Idea|null = await ideaModel.findById({_id : ideaId});
        console.log("fetchign the value  of the usermodel for this purpose \n");
        let currUser : User|null = await userModel.findById({_id : userId});
        if(!currIdeaModel)
        {
            throw new NotFoundError("Idea does not exists.");
        }
        else if(!currUser)
        {
            throw new NotFoundError("User not found");
        }


        // otherwise we have to think how to update the records inside the existing document for this purpose in the typescript 
        
        let savedUserIds = currIdeaModel.saved;
        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        let isPresent : boolean = false;

        // here we have to first check whether the user haS ALREADY SAVED the idea or not 
        // using the for loop for this purpose 
        savedUserIds.forEach((currUserId : mongoose.Types.ObjectId) => {
            if(currUserId._id.toString() === userId.toString())
            {
                console.log("both are same hence we have to make it true for this purpose \n");
                isPresent = true;
            }
        });

        if(isPresent)
        {
            console.log("came inside the error if else condition for this purpose \n");
            throw new ConflictError("User has already Saved the idea.");
        }
    
        console.log("the value of the ispresent is : ", isPresent);
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


