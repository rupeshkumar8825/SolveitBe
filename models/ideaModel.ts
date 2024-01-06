

import mongoose from "mongoose";



const ideaScheme = new mongoose.Schema({
    _id : {
        type : mongoose.Types.ObjectId
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
        type : mongoose.Types.ObjectId, 
        required : [true, "Please enter the user id who has created the idea."]
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
            type : mongoose.Types.ObjectId
        }
    }], 
    saved : [{
        userID : {
            type : mongoose.Types.ObjectId
        }
    }], 
    shared : [{
        userId : {
            type : mongoose.Types.ObjectId
        }
    }], 
    othersKnow : {
        type : String, 
    }

});

const ideaModel = mongoose.model("idea", ideaScheme);

// say everything went fine 
module.exports = ideaModel;