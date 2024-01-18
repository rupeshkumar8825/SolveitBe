import { Router } from "express";
import authRouter from "./authRoutes";
import ideaRouter from "./ideaRoutes";
import userRouter from "./userRoutes";

// this will be main router for from where we will distribute the routes to other services 
const router : Router  = Router();

router.use('/auth', authRouter);
router.use('/ideas', ideaRouter)
router.use('/users', userRouter);

// we have to export this for this purpose 
export default router;