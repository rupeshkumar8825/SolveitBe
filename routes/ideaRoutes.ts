import ideaController from "../controllers/ideaController";
import authMiddleware from "../middleware/authMiddleware";

const express = require("express");
// const getAllIdeas

const router = express.Router();


router.route("/").get(authMiddleware, ideaController.getAllIdeasController);
router.route("/").post(authMiddleware, ideaController.createNewIdeaController);
router.route("/save/:ideaId").post(authMiddleware, ideaController.saveIdeaByUserController);
export default router;