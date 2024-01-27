import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";

// here we have to create the use controller here for this purpose 
class UserController {
    async getAllUsersController(req : Request, res: Response, next : NextFunction) : Promise<void> {
        try {
            let serviceResponse = await userService.getAllUsersService();
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error)
        }
    }

    async getUserDetailsByIdController (req : Request, res: Response, next : NextFunction) : Promise<void> {
        try {
            const userId : string = req.params["userId"];
            let serviceResponse = await userService.getUserDetailsByIdService(userId);
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error)
        }
    }

    
}


export default new UserController();