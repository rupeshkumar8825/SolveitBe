import { finished } from "stream";
import { ServiceResponse } from "../Dtos/ServiceResponseDto";
import { AuthenticationError } from "../errorHandling/AuthenticationError";
import ideaService from "../services/ideaService";
import IdeaService from "../services/ideaService";
import{Response, Request, NextFunction} from "express";
import { NotFoundError } from "../errorHandling/NotFoundError";



class IdeaController {
    async getAllIdeasController (req: Request, res: Response,  next : NextFunction) : Promise<void>
    {
        try {
            
            let serviceResponse = await IdeaService.getAllIdeasService();
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error)
        }
        
    }



    async createNewIdeaController (req :Request, res : Response, next : NextFunction) : Promise<void> {
        try {
            let uploadedFileName = req.file?.filename;
            if(!uploadedFileName) {
                throw new NotFoundError("File name does not exist");
            }

            console.log("sending the value of the filename to the addnewideaservice. The file name is as follows : \n", uploadedFileName);
            let serviceResponse = await ideaService.addNewIdeaService(req.body, uploadedFileName);
            console.log("the response that i am sending to the frontend is as follows : \n", serviceResponse);
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



    async saveIdeaByUserController(req : Request, res : Response, next : NextFunction) : Promise<void>
    {
        try {
            const clientToken : string|undefined = req.headers.authorization?.split(" ")[1];
            if(!clientToken)
            {
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
        try {
            const clientToken  : string|undefined = req.headers.authorization?.split(" ")[1];

            if(!clientToken)
            {
                throw new AuthenticationError("Cannot find the token in the header.");
            }

            let ideaId : string = req.params["ideaId"];
            let response = await ideaService.upvotedIdeaByUserService(clientToken, ideaId);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async shareIdeaByUserController (req : Request, res : Response, next : NextFunction) : Promise<void> 
    {
        try {
            const clientToken : string | undefined = req.headers.authorization?.split(" ")[1];
            const ideaId : string = req.params["ideaId"];
            if(!clientToken)
            {
                throw new AuthenticationError("Token not found.");
            }

            let serviceResponse = await ideaService.shareIdeaByIdService(clientToken, ideaId);

            // say everything went fine 
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error)
        }
    }

    async deleteIdeaBydIdController (req : Request, res : Response, next : NextFunction) : Promise<void> 
    {
        try {
            const clientToken : string|undefined = req.headers.authorization?.split(" ")[1];
            if(!clientToken)
            {
                throw new AuthenticationError("Token does not exist.");
            }

            const ideaId : string | undefined = req.params["ideaId"];

            let serviceResponse = await ideaService.deleteIdeaService(clientToken, ideaId);

            // say everything went fine 
            res.status(200).json(serviceResponse);

        } catch (error) {
            next(error)
        }
    } 

    async getAllIdeasThumbnailController(req : Request, res : Response, next : NextFunction) : Promise<void>
    {
        try {
            let serviceResponse = await ideaService.getAllIdeasThumbnailService();
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error);
        }
    }
    
}

// say everything went fine 
export default new IdeaController;