import { NextFunction } from "express";

// this is the authentication middleware to authenticate the token of the user 
const authMiddleware = (req : Request, res : Response,  next : NextFunction) => {
    console.log("inside the auth middleware to validate the user details \n");
    // we have to fetch the data from the header of the request 
    const clientToken = req.headers;

    console.log("the value of the token from the user side is as follows \n", clientToken);

    // say everything went fine 
    next();
}

export default authMiddleware;