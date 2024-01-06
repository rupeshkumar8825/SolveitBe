import { getAllIdeas } from './../controllers/ideaController';
const express = require("express");
// const getAllIdeas

const router = express.Router();


router.route("/ideas").get(getAllIdeas);


module.exports = router;