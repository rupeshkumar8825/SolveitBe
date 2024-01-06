// in this we will mention the idea model for this purpose 
// here we will have the schema for the idea model for this purpose 
// const mongoose = require("mongoose")
import {Document, Schema, model, Types} from "mongoose";

const ideaScheme = mongoose.Schema({
    _id : {
        type : Types.ObjectId
    }, 
    ideaName : {
        type : String, 
        required : [true, "Please enter the product name."],
        trim : true
    }, 
    ideaDescription : {
        type : String, 
        trim : true
    }, 
    createdOn : {
        type : Date, 
        default : Date.now()
    }, 
    createdBy : {
        type : Types.ObjectId, 
        required : [true, "Please enter the user id who has created the idea."];
    }, 
    category : {
        type : String, 
        required : true
    }, 
    rating : {
        type : Number, 
    }, 
    thumbnail : {
        type : String
    }, 
    upvotes : [{
        userId : {
            type : Types.ObjectId
        }
    }], 
    saved : [{
        userID : {
            type : Types.ObjectId
        }
    }], 
    shared : [{
        userId : {
            type : Types.ObjectId
        }
    }], 
    othersKnow : {
        type : String, 
    }

});

const ideaModel = mongoose.model("idea", ideaScheme);

// say everything went fine 
module.exports = ideaModel;