import { Router } from 'express';
import express  from 'express';
import authMiddleware from '../middleware/authMiddleware';
import UserController from '../controllers/userController';


const router = express.Router();

router.route("/").get(authMiddleware, UserController.getAllUsersController);
router.route("/:userId").get(authMiddleware, UserController.getUserDetailsByIdController)

export default router;