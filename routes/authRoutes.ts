// here we will route the routes related to the authentication 
import express, { Router } from "express";
// import { loginController } from "../controllers/authController";
import AuthController from "../controllers/authController";

const router = express.Router();

router.route("/login").post(AuthController.login);

export default router;