// here we will route the routes related to the authentication 
import express, { Router } from "express";
import { loginController } from "../controllers/authController";

const router = express.Router();

router.route("/login").post(loginController);

export default router;