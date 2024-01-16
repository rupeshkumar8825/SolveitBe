// import { applicationErrorMiddleware } from "./middleware/errorHandlerMiddleware";

import express, { Application } from "express";
import { applicationErrorMiddleware } from "./middleware/errorHandlerMiddleware";
import AppConfig from "./config/appConfig";
import * as swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv'
import mainRouter from "./routes/index";
import cookieParser from "cookie-parser";
dotenv.config();


export const createServer = () : Application => {
    console.log("creating the new server for this purpose \n");

    const app = express();

    // using the middlewares that are required for this application for this purpose 
    app.use(express.urlencoded({extended : false}))
    app.use(express.json());
    app.use(cookieParser());
    app.use(`/api/${AppConfig.app.apiVersion}`, mainRouter);
    console.log("value of the apiversion in the environment for this purpose \n", AppConfig.app.apiVersion);
    // checking whether the environment is development or not 
    if(AppConfig.app.isDevelopment)
    {
        console.log('we are in the development mode \n');
    }    
    app.use(applicationErrorMiddleware);
    
    // say everything went fine 
    return app;
}