// import express from "express";
const express = require("express");
import { Request, Response } from "express";
// const app = express();
const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


// telling the node server to use the following the config file to load the environment variables for this purpose 
dotenv.config({path : __dirname + "/config/config.env"});

connectDatabase();

console.log(`Server is running or working on http://localhost/${process.env.PORT}`);
const server = app.listen(process.env.PORT, () => {
    console.log("successfully running the server.");
})


