// here we will define out global error handler middleware which will be hit if there will be any kind of error for this purpose 

import express, {Express, Response, Request, NextFunction} from "express"
import { AuthenticationError } from "../errorHandling/AuthenticationError";
import { NotFoundError } from "../errorHandling/NotFoundError";
import { ConflictError } from "../errorHandling/ConflictError";

export const applicationErrorMiddleware = (error: Error, req : Request, res : Response , next : NextFunction) => {
    console.log("OHOHO!! we are inside the global error middleware function for this purpose \n");

    console.log("the value of error that we have got is as follows \n", error);
    // using the if else statement to check which error happened for this purpose
    if(error instanceof AuthenticationError)
    {
        console.log("we are inside the authentication error.")
        res.status(401).json({
            error : error.message
        })
    }
    else if(error instanceof NotFoundError)
    {
        res.status(404).json({
            error : error.message
        })
    }
    else if(error instanceof ConflictError)
    {
        res.status(409).json({
            error : error.message
        })
    }

    
}