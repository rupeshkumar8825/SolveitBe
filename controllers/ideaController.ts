import { AuthenticationError } from "../errorHandling/AuthenticationError";
import { getAllIdeasService } from "../services/ideaService";
import express, {Express, Response, Request} from "express";
// this is controller for the idea related endpoints for this purpose 
// const ideaModel = require("../models/ideaModel");
// import { ideaModel } from "../models/ideaModel";
const ideaModel = require("../models/ideaModel");

// import customError from "../.git"

// making the controller for getting the list of all the ideas currently in the database for this purpose 
export const getAllIdeasController = (req : Request, res : Response) => {
    const serviceResponse = getAllIdeasService();
    
    const responseData = {
        message : serviceResponse
    };

    res.json(responseData);

}