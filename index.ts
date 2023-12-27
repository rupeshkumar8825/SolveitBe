// import express from "express";
const express = require("express");
import { Request, Response } from "express";
const app = express();

let PORT:number  = 3001;

app.get("/", (req:Request, res:Response) => {

    res.send("hello from the server side");
})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})
