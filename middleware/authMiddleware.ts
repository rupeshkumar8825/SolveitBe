import { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";
import AppConfig from "../config/appConfig";
import { AuthenticationError } from "../errorHandling/AuthenticationError";

const authMiddleware = (req : Request, res : Response,  next : NextFunction) => {
    const clientToken = req.cookies.token;
    if(!clientToken)
    {
        throw new AuthenticationError("Cannot find token in authorization headers\n");
    }

    const decoded = jwt.verify(clientToken as string, AppConfig.app.secret);
    
    // say everything went fine 
    next();
}

export default authMiddleware;