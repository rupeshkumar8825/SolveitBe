import { ServiceResponse } from './../Dtos/ServiceResponseDto';
import Idea, { ideaModel } from './../models/ideaModel';
import { IdeaCreateResponseDto, IdeaCreateRequestDto, IdeaThumbnailResponseDto } from '../Dtos/IdeaRelatedDtos';
import ideaRepository from '../repository/ideaRepository';
import { ServerError } from '../errorHandling/ServerError';
import tokenService from './tokenService';
import { ILoginTokenDecode } from '../interfaces';

interface IIdeaService {
    getAllIdeasService() : Promise<ServiceResponse<Array<Idea>>>, 
    getIdeaByIdService(ideaId : string) : Promise<ServiceResponse<Idea>>, 
    addNewIdeaService(ideaDetails : IdeaCreateRequestDto, uploadedFileName : string) : Promise<ServiceResponse<IdeaCreateResponseDto>>,
    deleteIdeaService(clientToken : string, ideaId : string) : Promise<ServiceResponse<string>>, 
    saveIdeaByUserService (clientToken : string , ideaId : string) : Promise<ServiceResponse<string>>, 
    upvotedIdeaByUserService (clientToken : string, ideaId : string) : Promise<ServiceResponse<string>>, 
    shareIdeaByIdService(clientToken : string, ideaId : string) : Promise<ServiceResponse<string>>, 
    getAllIdeasThumbnailService() : Promise<ServiceResponse<Array<IdeaThumbnailResponseDto>>>
    removeUpvoteOfIdeaService(clientToken : string, ideaId : string) : Promise<ServiceResponse<string>>
}


class IdeaService implements IIdeaService {
    async getAllIdeasThumbnailService(): Promise<ServiceResponse<IdeaThumbnailResponseDto[]>> {
        try {
            let serviceResponse = new ServiceResponse<IdeaThumbnailResponseDto[]>();

            let repositoryResponse = await ideaRepository.getAllIdeasThumbnail();
            
            serviceResponse.data = repositoryResponse;
            serviceResponse.success = true;
            serviceResponse.message = "Success";
            
            return serviceResponse;
        } catch (error) {
            throw error;
        }
    }


    
    
    async shareIdeaByIdService(clientToken: string, ideaId: string): Promise<ServiceResponse<string>> {
        try {
            let serviceResponse = new ServiceResponse<string>();
            
            const tokenDecode : ILoginTokenDecode = await tokenService.decodeTokenService(clientToken);
            const userId : string = tokenDecode.id;


            let repositoryResponse = await ideaRepository.shareIdeaByUser(userId, ideaId);
            serviceResponse.message = repositoryResponse;
            serviceResponse.success = true;

            // say everything went fine 
            return serviceResponse;
        } catch (error) {
            throw error;
        }
    }

    

    async removeUpvoteOfIdeaService(clientToken: string, ideaId: string): Promise<ServiceResponse<string>> {
        try {
            const tokenDecode : ILoginTokenDecode = await tokenService.decodeTokenService(clientToken);
            const userId : string = tokenDecode.id;

            // calling the repository for updateing the entries inside the database for this puropse 
            let repositoryResponse = await ideaRepository.removeUpvoteOfIdea(userId, ideaId)
            let serviceResponse  = new ServiceResponse<string>();
            serviceResponse.success = true;
            serviceResponse.message = repositoryResponse;

            
            // say everything went fine 
            return serviceResponse;
        } catch (error) {
            throw error;
        }
    }

    async upvotedIdeaByUserService(clientToken: string, ideaId: string): Promise<ServiceResponse<string>> {
        try {
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
            let response : ServiceResponse<Array<Idea>> = new ServiceResponse<Array<Idea>>
            (listOfIdeas, "", false);

            
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
    


    async addNewIdeaService(ideaDetails: IdeaCreateRequestDto, uploadedFileName : string): Promise<ServiceResponse<IdeaCreateResponseDto>> {
        try {
            let serviceResponse  = new ServiceResponse<IdeaCreateResponseDto>();
            let repositoryResponse = await ideaRepository.createNewIdea(ideaDetails, uploadedFileName);

            if(!repositoryResponse)
            {
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
        try {
            let serviceResponse = new ServiceResponse<string>();

            const tokenDecode : ILoginTokenDecode = await tokenService.decodeTokenService(clientToken);
            const userId : string = tokenDecode.id;
            
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