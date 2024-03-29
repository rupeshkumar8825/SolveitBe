import multer from "multer";
import ideaController from "../controllers/ideaController";
import authMiddleware from "../middleware/authMiddleware";
import path from "path";

const express = require("express");
// const getAllIdeas

const router = express.Router();
 

// configuring the multer middleware to be able to upload the files on the server for this purpose 
var storage = multer.diskStorage({
    destination: 'public/uploads/', // uploading directory 
    filename: function ( req, file, cb ) { //change file name
        let ext = (path.extname(file.originalname)).toLowerCase(); //get file extension
        let time = Date.now(); //get timestamp
        cb( null, 'idea-'+time); //return renamed file
    }
});



var upload = multer({storage : storage});

router.route("/").get(authMiddleware, ideaController.getAllIdeasController);
router.route("/").post(authMiddleware, upload.single('thumbnail'), ideaController.createNewIdeaController);
router.route("/save/:ideaId").post(authMiddleware, ideaController.saveIdeaByUserController);
router.route("/upvote/:ideaId").post(authMiddleware, ideaController.upvoteIdeaByUserController);
router.route("/share/:ideaId").post(authMiddleware, ideaController.shareIdeaByUserController);
router.route("/:ideaId").delete(authMiddleware, ideaController.deleteIdeaBydIdController);
router.route("/:ideaId").get(authMiddleware, ideaController.getIdeaDetailsByIdController);
router.route("/image/thumbnail").get(authMiddleware, ideaController.getAllIdeasThumbnailController);
router.route("/unVote/:ideaId").post(authMiddleware, ideaController.removeUpvoteOfIdeaController);


export default router; 