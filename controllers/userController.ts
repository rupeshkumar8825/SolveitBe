import { NextFunction, Request, Response } from "express";

// here we have to create the use controller here for this purpose 
class UserController {
    async getAllUsersController(req : Request, res: Response, next : NextFunction) : Promise<void> {
        try {
            console.log("inside the user controller getall users controller handler \n");
        } catch (error) {
            next(error)
        }
    }
}


export default new UserController();