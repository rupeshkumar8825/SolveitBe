import { IdeaCreateRequestDto, IdeaCreateResponseDto } from "../Dtos/IdeaRelatedDtos";
import Idea, { ideaModel } from "../models/ideaModel";

// this is repostiory for the authentication related services for this purpose 
interface IIdeaRepository {
    getAllIdeas () : Promise<Array<Idea>>,
    getIdeaById (ideaId : string) : Promise<Idea> ,
    createNewIdea(ideaDetails : IdeaCreateRequestDto) : Promise<IdeaCreateResponseDto>,
    deleteIdeaById(ideaId : string) : Promise<string>
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
            _id : "", 
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

}

export default new IdeaRepository();


