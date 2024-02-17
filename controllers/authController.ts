import express , {Express, Response, Request, NextFunction} from "express";
import { NotFoundError } from "../errorHandling/NotFoundError";
import AuthenticationService from "../services/authService";
import authService from "../services/authService";



class AuthController {
    async login (req : Request, res : Response, next : NextFunction) : Promise<void>  {
        const googleToken = req.body.googleToken;
        if(googleToken === "" || googleToken === null)
        {
            throw new NotFoundError("Token Not Found");
        }


        try {

            const serviceResponse = await AuthenticationService.loginService(googleToken);
            res.cookie("token", serviceResponse.data, {httpOnly : true, maxAge : 3600000});
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error);       
        }

    }



    async authenticateUserController (req : Request, res : Response, next : NextFunction) : Promise<void> {
        try {
            const clientToken = req.cookies.token;
            let serviceResponse = await authService.authenticateUserService(clientToken);           
            res.status(200).json(serviceResponse);

        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController;