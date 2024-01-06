// this is random file for now here we will route the end points to routes or controllers for this purpose 
const express = require("express");
const app = express();
const ideaRoute = require("./routes/ideaRoutes")
app.use(express.json());

app.use("/api/v1", ideaRoute);


module.exports = app;