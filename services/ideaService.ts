// this is service for the idea related api endpoints for this purpose 

import { AuthenticationError } from "../errorHandling/AuthenticationError";
import { ideaModel } from "../models/ideaModel";

export const getAllIdeasService  = async () => {
 
    const ideaList = await ideaModel.find();
    
    return ideaList;
}