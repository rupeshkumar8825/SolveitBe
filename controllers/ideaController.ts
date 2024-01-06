import { AuthenticationError } from "../errorHandling/AuthenticationError";
import { getAllIdeasService } from "../services/ideaService";
import express, {Express, Response, Request} from "express";
// this is controller for the idea related endpoints for this purpose 
// const ideaModel = require("../models/ideaModel");
// import { ideaModel } from "../models/ideaModel";
const ideaModel = require("../models/ideaModel");

// import customError from "../.git"

// making the controller for getting the list of all the ideas currently in the database for this purpose 
export const getAllIdeas = (req : Request, res : Response) => {
    try {
        console.log("we are inside the ideas controller and inside the controller \n");
        const serviceResponse = getAllIdeasService();
        if(serviceResponse === "false")
        {
            // here we will throw some errors for this purpose 
            throw new AuthenticationError("Some Authentication error for this purpose", {});
        }
        const responseData = {
            message : serviceResponse
        };
    
        // here we have to throw new error for this purose 
    
        // say everything went fine for this purpose 
        // res.json(responseData);
        res.json(responseData);
        
    } catch (error : any) {
        console.log("some error happened here for this purpose\n", error.message);
    }
    // here we can have to call the service of the idea 

}