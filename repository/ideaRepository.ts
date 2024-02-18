import mongoose, { ObjectId } from "mongoose";
import { IdeaCreateRequestDto, IdeaCreateResponseDto, IdeaThumbnailResponseDto } from "../Dtos/IdeaRelatedDtos";
import Idea, { ideaModel } from "../models/ideaModel";
import { NotFoundError } from '../errorHandling/NotFoundError';
import User, { userModel } from '../models/userModel';
import { ConflictError } from "../errorHandling/ConflictError";
import { UnAuthorizedError } from "../errorHandling/UnAuthorizedError";


interface IIdeaRepository {
    getAllIdeas () : Promise<Array<Idea>>,
    getIdeaById (ideaId : string) : Promise<Idea> ,
    createNewIdea(ideaDetails : IdeaCreateRequestDto, uploadedFileName : string) : Promise<IdeaCreateResponseDto>,
    deleteIdeaById(userId : string, ideaId : string) : Promise<string>, 
    saveIdeaByUser(userId : string, ideaId : string) : Promise<string>, 
    upvoteIdeaByUser(userId : string, ideaId : string) : Promise<string>, 
    shareIdeaByUser(userId : string, ideaId : string) : Promise<string>, 
    getAllIdeasThumbnail() : Promise<Array<IdeaThumbnailResponseDto>>
    removeUpvoteOfIdea(userId : string, ideaId : string) : Promise<string>
}




class IdeaRepository implements IIdeaRepository {
    async removeUpvoteOfIdea(userId: string, ideaId: string): Promise<string> {
        let repositoryResponse : string = "";

        
        // fetching the idea for this purpose 
        let currIdea : Idea|null = await ideaModel.findOne({_id : ideaId });
        if(!currIdea)
        {
            throw new NotFoundError("Idea does not exist");
        }

        

        // fetching the user here for this purpose 
        let currUser : User|null = await userModel.findOne({_id : userId});
        if(!currUser)
        {
            throw new NotFoundError("User does not exist");
        }


        let upvotedList = currIdea.upvotes;
        let updatedUpvotedList : mongoose.Types.ObjectId[]= [];
        upvotedList.forEach(currUser => {
            if(currUser._id.toString() !== userId.toString())
            {
                const userObjectId = new mongoose.Types.ObjectId(userId);
                updatedUpvotedList.push(userObjectId);
                
            }

        });


        await ideaModel.updateOne({_id : ideaId}, {$set : {upvotes : updatedUpvotedList}});

        // say everything went fine 
        return repositoryResponse;

    }




    
    async getAllIdeasThumbnail(): Promise<IdeaThumbnailResponseDto[]> {
        let repositoryResponse = new Array<IdeaThumbnailResponseDto>();
        
        let ideaList : Idea[] = await ideaModel.find();
        ideaList.forEach((currIdea : Idea) => {
            let currThumbnailResponse = new IdeaThumbnailResponseDto(currIdea._id.toString(), currIdea.thumbnail);
            repositoryResponse.push(currThumbnailResponse);
        });

        return repositoryResponse;
    }



    async shareIdeaByUser(userId: string, ideaId: string): Promise<string> {
        let repositoryResponse : string = "";
        const currUser : User|null = await userModel.findOne({_id : userId});
        const currIdea : Idea|null = await ideaModel.findOne({_id : ideaId});

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


        sharedList.forEach((currShare : mongoose.Types.ObjectId) => {
            if(currShare._id.toString() === userId)
            {
                isPresent = true;
            }
        })
        

        if(isPresent)
        {
            throw new ConflictError("User already in the shared list.");
        }
        

        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        sharedList.push(userIdObjectId);
        const updateResponse = await ideaModel.updateOne({_id : ideaId}, {$set : {
            shared : sharedList
        }});


        // say everything went fine 
        return repositoryResponse;
    }




    async upvoteIdeaByUser(userId: string, ideaId: string): Promise<string> {
        let repositoryResponse : string = "";
        let currUser : User|null = await userModel.findOne({_id : userId});
        let currIdeaModel : Idea | null = await ideaModel.findOne({_id : ideaId});

        if(!currUser)
        {
            throw new NotFoundError("User does not exists.");
        }
        if(!currIdeaModel)
        {
            throw new NotFoundError("Idea does not exists.");
        }


        let upvotedList = currIdeaModel.upvotes;
        let isPresent :  boolean = false;
        

        upvotedList.forEach((currUserId : mongoose.Types.ObjectId) => {
            if(currUserId._id.toString() === userId)
            {
                isPresent = true;
            }
        });

        
        
        if(isPresent)
        {
            throw new ConflictError("User has already upvoted the idea.");
        }

        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        upvotedList.push(userIdObjectId);
        const updatedResponse = await ideaModel.updateOne({_id : ideaId}, {$set : {
            upvotes : upvotedList
        }});


        // say everything went fine
        return repositoryResponse;
    }
    


    async getAllIdeas(): Promise<Idea[]> {
        let repositoryResponse : Array<Idea> = new Array<Idea>();
        repositoryResponse = await ideaModel.find();
        
        return repositoryResponse
    }
    
    

    async getIdeaById(ideaId: string): Promise<Idea> {
        let repositoryResponse : Idea | null = await ideaModel.findOne({_id : ideaId});

        if(repositoryResponse === null)
        {
            throw new NotFoundError("Idea does not exists.");
        }

        // say everything went fine 
        return repositoryResponse;
    }
    

    
    async createNewIdea(ideaDetails: IdeaCreateRequestDto, uploadedFileName : string): Promise<IdeaCreateResponseDto> {
        let repositoryResponse : IdeaCreateResponseDto = new IdeaCreateResponseDto();
        let newIdea = new ideaModel({
            _id : new mongoose.Types.ObjectId(), 
            ideaName : ideaDetails.ideaName, 
            ideaDescription : ideaDetails.ideaDescription, 
            createdOn : Date.now(), 
            createdBy : ideaDetails.createdBy, 
            category : ideaDetails.category, 
            rating : parseInt(ideaDetails.rating), 
            thumbnail : uploadedFileName, 
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
        let repositoryResponse = " ";
        const currIdeaDetails = await ideaModel.findOne({_id : ideaId});
        const currUser = await userModel.findOne({_id : userId});
        if(!currIdeaDetails)
        {
            throw new NotFoundError("Idea does not exist.");
        }
        if(!currUser)
        {
            throw new NotFoundError("User does not exist.");
        }


        const createdBy = currIdeaDetails.createdBy;
        if(!(userId === createdBy.toHexString()))
        {
            throw new UnAuthorizedError("This user cannot delete the idea as he has not created it.");
        
        }


        // otherwiwe we have to delete this idea for this purpose 
        const deleteResponse = await ideaModel.deleteOne({_id : ideaId});

        // say everything went fine 
        return repositoryResponse;
    }

    


    async saveIdeaByUser(userId: string, ideaId : string): Promise<string> {
        let repositoryResponse = "";

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
        return repositoryResponse;
    }
}

export default new IdeaRepository();


