import { ServiceResponse } from "../Dtos/ServiceResponseDto";
import { AuthenticationError } from "../errorHandling/AuthenticationError";
import ideaService from "../services/ideaService";
import IdeaService from "../services/ideaService";
import{Response, Request, NextFunction} from "express";

class IdeaController {
    async getAllIdeasController (req: Request, res: Response,  next : NextFunction) : Promise<void>
    {
        try {
            
            let serviceResponse = await IdeaService.getAllIdeasService();
            res.status(200).json({serviceResponse});
            
            
        } catch (error) {
            next(error)
        }
        
    }

    async createNewIdeaController (req :Request, res : Response, next : NextFunction) : Promise<void> {
        // using the try  catchfor this pruopser 
        try {
            let serviceResponse = await ideaService.addNewIdeaService(req.body);
            res.status(200).json({serviceResponse});
        } catch (error) {
            next(error)
        }
    }

    async getIdeaDetailsByIdController (req : Request, res: Response , next : NextFunction) : Promise<void> {
        try {
            let serviceResponse = await ideaService.getIdeaByIdService(req.params["ideaId"]);
            res.status(200).json({serviceResponse});
        } catch (error) {
            next(error);
        }
    }

    // making the controller function to allow to save the idea 
    async saveIdeaByUserController(req : Request, res : Response, next : NextFunction) : Promise<void>
    {
        try {
            const clientToken : string|undefined = req.headers.authorization?.split(" ")[1];
            if(!clientToken)
            {
                // here we have to throw the error for this pruopse 
                throw new AuthenticationError("Cannot Find Token in the header\n");
            }
            let ideaId : string = req.params["ideaId"];
            let response = await ideaService.saveIdeaByUserService(clientToken, ideaId);
            res.status(200).json(response);
        } catch (error) {
            next(error)
        }
    }

    async upvoteIdeaByUserController (req : Request, res : Response, next : NextFunction) : Promise<void>
    {
        // using the try catch block for this purpose 
        try {
            const clientToken  : string|undefined = req.headers.authorization?.split(" ")[1];

            if(!clientToken)
            {
                // then we have to throw the error for this purpose 
                throw new AuthenticationError("Cannot find the token in the header.");
            }

            let ideaId : string = req.params["ideaId"];
            let response = await ideaService.upvotedIdeaByUserService(clientToken, ideaId);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

// say everything went fine 
export default new IdeaController;