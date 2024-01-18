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
}

// say everything went fine 
export default new IdeaController;