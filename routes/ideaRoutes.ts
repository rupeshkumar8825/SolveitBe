import { getAllIdeasController } from './../controllers/ideaController';
const express = require("express");
// const getAllIdeas

const router = express.Router();


router.route("/ideas").get(getAllIdeasController);


module.exports = router;