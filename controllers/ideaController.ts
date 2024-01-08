import { AuthenticationError } from "../errorHandling/AuthenticationError";
import { getAllIdeasService } from "../services/ideaService";
import express, {Express, Response, Request, NextFunction} from "express";
// this is controller for the idea related endpoints for this purpose 
// const ideaModel = require("../models/ideaModel");
// import { ideaModel } from "../models/ideaModel";
const ideaModel = require("../models/ideaModel");

// import customError from "../.git"

// making the controller for getting the list of all the ideas currently in the database for this purpose 
export const getAllIdeasController = async (req : Request, res : Response, next : NextFunction) => {

    // here we will have to keep the code inside the try and catch block for this purpose 
    try {
        const serviceResponse = await getAllIdeasService();
        const responseData = {
            message : serviceResponse
        };

        res.status(200).json(responseData);
        
    } catch (error) {
        next(error);
    }

}