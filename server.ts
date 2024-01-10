import express, { Application, urlencoded } from "express";

// here we will be making the create server function for this purpose 
export const createServer =   (): Application =>  {
    console.log("here we are creating the new server for the solveit backend application for this puropse \n")
    const app = express();
    

    // using the middlewares here using teh app.use for this purpose 
    app.use(express.json());
    app.use(express.urlencoded({extended : false}));
    app.use()
}