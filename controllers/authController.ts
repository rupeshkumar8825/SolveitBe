// this is authentication controller to mention the routes for authentication related functionality for this purpose 

import express , {Express, Response, Request} from "express";

export const loginController = (req : Request, res : Response) => {
    console.log("INSIDE LOGIN CONTROLLER");

    // here we have to fetch the token from the request for this purpose 
    // fetching the token from the headers for this purpose 
    const authorizationHeader = req.headers.authorization;

    console.log("the value of authorization is as follows \n", authorizationHeader);

    res.status(200).json("done");

}