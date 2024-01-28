import { ServiceResponse } from './../Dtos/ServiceResponseDto';
import Idea, { ideaModel } from './../models/ideaModel';
import { IdeaCreateResponseDto, IdeaCreateRequestDto } from '../Dtos/IdeaRelatedDtos';
import ideaRepository from '../repository/ideaRepository';
import { ServerError } from '../errorHandling/ServerError';
import tokenService from './tokenService';
import { ILoginTokenDecode } from '../interfaces';

interface IIdeaService {
    getAllIdeasService() : Promise<ServiceResponse<Array<Idea>>>, 
    getIdeaByIdService(ideaId : string) : Promise<ServiceResponse<Idea>>, 
    addNewIdeaService(ideaDetails : IdeaCreateRequestDto) : Promise<ServiceResponse<IdeaCreateResponseDto>>,
    deleteIdeaService(clientToken : string, ideaId : string) : Promise<ServiceResponse<string>>, 
    saveIdeaByUserService (clientToken : string , ideaId : string) : Promise<ServiceResponse<string>>, 
    upvotedIdeaByUserService (clientToken : string, ideaId : string) : Promise<ServiceResponse<string>>, 
    shareIdeaByIdService(clientToken : string, ideaId : string) : Promise<ServiceResponse<string>>
}


class IdeaService implements IIdeaService {
    async shareIdeaByIdService(clientToken: string, ideaId: string): Promise<ServiceResponse<string>> {
        // we have to write this code using the try catch block for this purpose 
        try {
            let serviceResponse = new ServiceResponse<string>();
            // fetching the userid from the clietn token for this purpopse 
            const tokenDecode : ILoginTokenDecode = await tokenService.decodeTokenService(clientToken);
            const userId : string = tokenDecode.id;
            // here we have to call the repository for this purpose 
            let repositoryResponse = await ideaRepository.shareIdeaByUser(userId, ideaId);
            serviceResponse.message = repositoryResponse;
            serviceResponse.success = true;

            // say everything went fine 
            return serviceResponse;
        } catch (error) {
            throw error;
        }
    }

    
    async upvotedIdeaByUserService(clientToken: string, ideaId: string): Promise<ServiceResponse<string>> {
        // here we have to use the try catch block for this purpose 
        try {
            // here we have to fetch the value of the userid from the token for this puropse 
            const tokenDecode : ILoginTokenDecode = await tokenService.decodeTokenService(clientToken);
            const userId : string = tokenDecode.id;


            // calling the repository for updateing the entries inside the database for this puropse 
            let repositoryResponse = await ideaRepository.upvoteIdeaByUser(userId, ideaId)
            let serviceResponse  = new ServiceResponse<string>();
            serviceResponse.success = true;
            serviceResponse.message = repositoryResponse;
            
            // say everything went fine 
            return serviceResponse;
        } catch (error) {
            throw error;     
        }
    }



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
    
    async saveIdeaByUserService(clientToken : string, ideaId: string): Promise<ServiceResponse<string>> {
        try {

            let tokenServiceResponse : ILoginTokenDecode = await tokenService.decodeTokenService(clientToken);
            const userId : string = tokenServiceResponse.id;

            // here we have to call the idearepository for this puropse 
            let repositoryResponse = await ideaRepository.saveIdeaByUser(userId, ideaId);
            let serviceResponse = new ServiceResponse<string>();
            serviceResponse.success = true;
            serviceResponse.message = repositoryResponse;

            return serviceResponse;

        } catch (error) {
            throw error
        }
    }
    async deleteIdeaService(clientToken : string,ideaId: string): Promise<ServiceResponse<string>> {
        // using the try catch block for writing the better code for this purpose 
        try {
            let serviceResponse = new ServiceResponse<string>();
            // here we have to fetch the value of the userid
            const tokenDecode : ILoginTokenDecode = await tokenService.decodeTokenService(clientToken);
            const userId : string = tokenDecode.id;
            
            // calling the repository here for this purpose 
            const repositoryResponse = await ideaRepository.deleteIdeaById(userId, ideaId);

            serviceResponse.success = true;
            serviceResponse.message = repositoryResponse;

            // say everything went fine 
            return serviceResponse;
        } catch (error) {
            throw error;
        }
    }

}

export default new IdeaService();