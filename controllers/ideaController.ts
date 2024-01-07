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
        console.log("inside the ideas controller\n");
        const serviceResponse = await getAllIdeasService();
        console.log("after the service but inside the controller \n\n");
        const responseData = {
            message : serviceResponse
        };
        // throw new Error("some error occurred here for this purpose \n");
        res.json(responseData);
        
    } catch (error) {
        // sending this error to the global one for this purpose 
        console.log("inside the catch block ")
        next(error);
    }

}