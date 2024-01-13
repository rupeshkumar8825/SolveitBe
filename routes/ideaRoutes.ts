import ideaController from "../controllers/ideaController";
import authMiddleware from "../middleware/authMiddleware";

const express = require("express");
// const getAllIdeas

const router = express.Router();


router.route("/").get(authMiddleware, ideaController.getAllIdeasController);

export default router;