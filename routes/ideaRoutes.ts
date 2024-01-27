import ideaController from "../controllers/ideaController";
import authMiddleware from "../middleware/authMiddleware";

const express = require("express");
// const getAllIdeas

const router = express.Router();


router.route("/").get(authMiddleware, ideaController.getAllIdeasController);
router.route("/").post(authMiddleware, ideaController.createNewIdeaController);
router.route("/save/:ideaId").post(authMiddleware, ideaController.saveIdeaByUserController);
router.route("/upvote/:ideaId").post(authMiddleware, ideaController.upvoteIdeaByUserController);
router.route("/share/:ideaId").post(authMiddleware, ideaController.shareIdeaByUserController);
export default router;