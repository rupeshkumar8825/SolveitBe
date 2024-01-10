// import { applicationErrorMiddleware } from "./middleware/errorHandlerMiddleware";

import express, { Application } from "express";
import { applicationErrorMiddleware } from "./middleware/errorHandlerMiddleware";
import AppConfig from "./config/appConfig";
import * as swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv'
dotenv.config();


// // this is random file for now here we will route the end points to routes or controllers for this purpose 
// const express = require("express");
// const app = express();
// const ideaRoute = require("./routes/ideaRoutes")
// import authRoutes from "./routes/authRoutes";

// app.use(express.json());

// app.use("/api/v1", ideaRoute);
// app.use("/api/v1", authRoutes);

// app.use(applicationErrorMiddleware);

// module.exports = app;


export const createServer = () : Application => {
    console.log("creating the new server for this purpose \n");

    const app = express();

    // using the middlewares that are required for this application for this purpose 
    app.use(express.urlencoded({extended : false}))
    app.use(express.json());
    app.use(applicationErrorMiddleware);

    // checking whether the environment is development or not 
    if(AppConfig.app.isDevelopment)
    {
        console.log('we are in the development mode \n');
    }    

    // say everything went fine 
    return app;
}