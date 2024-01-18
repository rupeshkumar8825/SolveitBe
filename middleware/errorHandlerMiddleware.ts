// here we will define out global error handler middleware which will be hit if there will be any kind of error for this purpose 

import express, {Express, Response, Request, NextFunction} from "express"
import { AuthenticationError } from "../errorHandling/AuthenticationError";
import { NotFoundError } from "../errorHandling/NotFoundError";
import { ConflictError } from "../errorHandling/ConflictError";
import { BadRequestError } from "../errorHandling/BadRequestError";
import { ServerError } from "../errorHandling/ServerError";
import { JsonWebTokenError } from "jsonwebtoken";

export const applicationErrorMiddleware = (error: Error, req : Request, res : Response , next : NextFunction) => {
    // using the if else statement to check which error happened for this purpose
    if(error instanceof AuthenticationError)
    {
        res.status(401).json({
            error : error
        })
    }
    else if(error instanceof NotFoundError)
    {
        res.status(404).json({
            error : error
        })
    }
    else if(error instanceof ConflictError)
    {
        res.status(409).json({
            error : error
        })
    }
    else if(error instanceof BadRequestError)
    {
        res.status(400).json({
            error : error, 
        })
    }
    else if(error instanceof ServerError)
    {
        res.status(500).json({
            error : error, 
        })
    } 
    else if(error instanceof JsonWebTokenError)
    {
        res.status(401).json({
            error : error, 
        })
    }
    else 
    {
        res.status(500).json({
            error : error.message
        })
    }
    

    
}