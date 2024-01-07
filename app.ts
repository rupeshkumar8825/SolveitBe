import { applicationErrorMiddleware } from "./middleware/errorHandlerMiddleware";

// this is random file for now here we will route the end points to routes or controllers for this purpose 
const express = require("express");
const app = express();
const ideaRoute = require("./routes/ideaRoutes")
import authRoutes from "./routes/authRoutes";

app.use(express.json());

app.use("/api/v1", ideaRoute);
app.use("/api/v1", authRoutes);

app.use(applicationErrorMiddleware);

module.exports = app;