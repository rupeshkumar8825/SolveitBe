import { ServiceResponse } from './../Dtos/ServiceResponseDto';
import Idea, { ideaModel } from './../models/ideaModel';
import { IdeaCreateResponseDto, IdeaCreateRequestDto } from '../Dtos/IdeaRelatedDtos';
import ideaRepository from '../repository/ideaRepository';

interface IIdeaService {
    getAllIdeasService() : Promise<ServiceResponse<Array<Idea>>>, 
    getIdeaByIdService(ideaId : string) : Promise<ServiceResponse<Idea>>, 
    addNewIdeaService(ideaDetails : IdeaCreateRequestDto) : Promise<ServiceResponse<IdeaCreateResponseDto>>,
    deleteIdeaService(ideaId : string) : Promise<ServiceResponse<string>>
}


class IdeaService implements IIdeaService {
    async getAllIdeasService(): Promise<ServiceResponse<Idea[]>> {
        let listOfIdeas : Array<Idea> = [];

        let response : ServiceResponse<Array<Idea>> = new ServiceResponse<Array<Idea>>(listOfIdeas, "", false);

        try {
            listOfIdeas = await ideaRepository.getAllIdeas();
            response.data = listOfIdeas;
            response.message = "Success";
            response.success = true;
            return response;
            
        } catch (error) {
            throw error;
        }
    }


    getIdeaByIdService(ideaId: string): Promise<ServiceResponse<Idea>> {
        throw new Error('Method not implemented.');
    }
    
    addNewIdeaService(ideaDetails: IdeaCreateRequestDto): Promise<ServiceResponse<IdeaCreateResponseDto>> {
        throw new Error('Method not implemented.');
    }
    
    deleteIdeaService(ideaId: string): Promise<ServiceResponse<string>> {
        throw new Error('Method not implemented.');
    }

}

export default new IdeaService();