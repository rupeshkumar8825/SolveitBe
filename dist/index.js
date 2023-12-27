"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const express = require("express");
const app = express();
let PORT = 3001;
app.get("/", (req, res) => {
    res.send("hello from the server side");
});
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
