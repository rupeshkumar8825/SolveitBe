import mongoose from "mongoose";
import { IdeaCreateRequestDto, IdeaCreateResponseDto } from "../Dtos/IdeaRelatedDtos";
import Idea, { ideaModel } from "../models/ideaModel";
import { NotFoundError } from '../errorHandling/NotFoundError';
import User, { userModel } from '../models/userModel';

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

        // now in this we have to insert the new user id for this purpose 
        savedUserIds.push(userIdObjectId);
        
        console.log("the list of users who have saved the idea are as follows \n", savedUserIds);
        const updateResponse = await ideaModel.updateOne({_id : ideaId}, {$set: {
            saved : savedUserIds
        }});

        console.log("the response after updating the value of the mongodb entry is as follows \n");
        console.log(updateResponse);
        // say everything went fine 
        return repositoryResponse;
    }
}

export default new IdeaRepository();


