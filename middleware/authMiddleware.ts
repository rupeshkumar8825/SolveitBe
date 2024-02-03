import { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";
import AppConfig from "../config/appConfig";
import { AuthenticationError } from "../errorHandling/AuthenticationError";

// this is the authentication middleware to authenticate the token of the user 
const authMiddleware = (req : Request, res : Response,  next : NextFunction) => {
    console.log("inside the auth middleware to validate the user details \n");
    // we have to fetch the data from the header of the request 
    // const clientToken = req.headers.get('authorization')
    const clientToken = req.cookies.token;
    console.log("the value of the clienttoken from the req.headers.cookeis is as follows \n", clientToken);
    if(!clientToken)
    {
        // then we have to throw the error here stating authorization is not there 
        throw new AuthenticationError("Cannot find token in authorization headers\n");
    }

    console.log("the value of the token from the user side is as follows \n", clientToken);

    // now here we have to validate the token whether the token is valid or not for this purpose 
    // using the try catch block here so that we can return 401 response to the frontend
    const decoded = jwt.verify(clientToken as string, AppConfig.app.secret);
    console.log("the decoded value of the token is as follows \n", decoded);
    // say everything went fine 
    next();
}

export default authMiddleware;