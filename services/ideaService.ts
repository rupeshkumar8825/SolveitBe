import { ServiceResponse } from './../Dtos/ServiceResponseDto';
import Idea, { ideaModel } from './../models/ideaModel';
import { IdeaCreateResponseDto, IdeaCreateRequestDto } from '../Dtos/IdeaRelatedDtos';
import ideaRepository from '../repository/ideaRepository';
import { ServerError } from '../errorHandling/ServerError';

interface IIdeaService {
    getAllIdeasService() : Promise<ServiceResponse<Array<Idea>>>, 
    getIdeaByIdService(ideaId : string) : Promise<ServiceResponse<Idea>>, 
    addNewIdeaService(ideaDetails : IdeaCreateRequestDto) : Promise<ServiceResponse<IdeaCreateResponseDto>>,
    deleteIdeaService(ideaId : string) : Promise<ServiceResponse<string>>
}


class IdeaService implements IIdeaService {
    async getAllIdeasService(): Promise<ServiceResponse<Idea[]>> {
        
        try {
            let listOfIdeas : Array<Idea> = [];
    
            let response : ServiceResponse<Array<Idea>> = new ServiceResponse<Array<Idea>>(listOfIdeas, "", false);
            listOfIdeas = await ideaRepository.getAllIdeas();
            response.data = listOfIdeas;
            response.message = "Success";
            response.success = true;
            return response;
            
        } catch (error) {
            throw error;
        }
    }


    async getIdeaByIdService(ideaId: string): Promise<ServiceResponse<Idea>> {
        // here we have to call the repository for fetching the details of the idea given the id for this purpose 
        // using the try catch for this purpose 
        try {
            let repositoryResponse = await ideaRepository.getIdeaById(ideaId);
            let serviceResponse = new ServiceResponse<Idea>();
            serviceResponse.data = repositoryResponse;
            serviceResponse.message = "Success";
            serviceResponse.success = true;

            // say everything went fine 
            return serviceResponse;
        } catch (error) {
            throw error;
        }
    }
    
    async addNewIdeaService(ideaDetails: IdeaCreateRequestDto): Promise<ServiceResponse<IdeaCreateResponseDto>> {
        // here we have to validate the user and get hte user details for this purpose 
        console.log("the details about the new idea details is as follows \n");
        console.log(ideaDetails);

        // using the try catch block for this purpose 
        try {
            let serviceResponse  = new ServiceResponse<IdeaCreateResponseDto>();
            let repositoryResponse = await ideaRepository.createNewIdea(ideaDetails);

            if(!repositoryResponse)
            {
                // here we have to tell that some internal error happened 
                throw new ServerError("Failed to create new idea.");
            }
            
            serviceResponse.success = true;
            serviceResponse.message = "success";
            serviceResponse.data = repositoryResponse;

            // say everything went fine 
            return serviceResponse;
        } catch (error) {
            throw error;
        }

    }
    
    deleteIdeaService(ideaId: string): Promise<ServiceResponse<string>> {
        throw new Error('Method not implemented.');
    }

}

export default new IdeaService();