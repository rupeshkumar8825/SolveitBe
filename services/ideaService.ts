// this is service for the idea related api endpoints for this purpose 

import { AuthenticationError } from "../errorHandling/AuthenticationError";
import { ideaModel } from "../models/ideaModel";

export const getAllIdeasService  = async () => {
 
    // here we also have to verify the user whether he is the authorized user or not for this purpose 
    
    // here we have to fetch the list of all ideas for this purpose 
    const serviceResponse = await ideaModel.find();
    console.log("I am raising the error inside the idea services for this purpose \n\n\n");
    // throw new Error("Token Authentication error");
    throw new AuthenticationError("some error occurred here for this purpose");

    console.log("The list of ideas is as follows \n", serviceResponse);
    // say everything went fine 
    return serviceResponse;
}