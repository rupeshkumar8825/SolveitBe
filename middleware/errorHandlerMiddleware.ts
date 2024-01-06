// here we will define out global error handler middleware which will be hit if there will be any kind of error for this purpose 

import express, {Express, Response, Request, NextFunction} from "express"

export const applicationErrorMiddleware = (error: Error, req : Request, res : Response , next : NextFunction) => {
    console.log("OHOHO!! we are inside the global error middleware function for this purpose \n");

    // here we have to send the response to the route with appropriate status codes and messages to the user for this purpose 
    // say everything went fine 
    res.status(400).json({
        error : error.message
    });
}