import { AuthenticationError } from "../errorHandling/AuthenticationError";
import { getAllIdeasService } from "../services/ideaService";
import express, {Express, Response, Request, NextFunction} from "express";
// this is controller for the idea related endpoints for this purpose 
// const ideaModel = require("../models/ideaModel");
// import { ideaModel } from "../models/ideaModel";
const ideaModel = require("../models/ideaModel");

class IdeaController {
    async getAllIdeasController (req: Request, res: Response,  next : NextFunction) : Promise<void>
    {
        console.log("inside the idea controller to get all the ideas list for this purpose \n");
        res.send("everything is fine \n");
    }
}

// say everything went fine 
export default new IdeaController;