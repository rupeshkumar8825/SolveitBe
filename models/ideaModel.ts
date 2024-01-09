

import mongoose, { Schema } from "mongoose";

// creating the interface for ideaModel for this purpose 
export const  DOCUMENT_NAME = "Idea";
export const COLLECTION_NAME = "ideas";


// defining the interface here for this purpose 
export default interface Idea {
    _id : mongoose.Types.ObjectId,
    ideaName : string, 
    ideaDescription : string, 
    createdOn : Date,
    createdBy : mongoose.Types.ObjectId, 
    category : string, 
    rating : number, 
    thumbnail : string, 
    saved : mongoose.Types.ObjectId[], 
    upvotes : mongoose.Types.ObjectId[], 
    shared : mongoose.Types.ObjectId[], 
    othersKnow : string 

}

const ideaScheme = new mongoose.Schema<Idea>({
    _id : {
        type : Schema.Types.ObjectId
    }, 
    ideaName : {
        type : Schema.Types.String, 
        required : [true, "Please enter the product name."],
        trim : true
    }, 
    ideaDescription : {
        type : Schema.Types.String, 
        trim : true
    }, 
    createdOn : {
        type : Schema.Types.Date, 
        default : Date.now()
    }, 
    createdBy : {
        type : Schema.Types.ObjectId, 
        required : [true, "Please enter the user id who has created the idea."]
    }, 
    category : {
        type : Schema.Types.String, 
        required : true
    }, 
    rating : {
        type : Schema.Types.Number, 
    }, 
    thumbnail : {
        type : Schema.Types.String
    }, 
    upvotes : [{
        userId : {
            type : Schema.Types.ObjectId
        }
    }], 
    saved : [{
        type : {
            type : Schema.Types.ObjectId, 
            
        }
    }], 
    shared : [{
        userId : {
            type : Schema.Types.ObjectId
        }
    }], 
    othersKnow : {
        type : Schema.Types.String, 
    }

});

export const ideaModel = mongoose.model<Idea>(DOCUMENT_NAME, ideaScheme, COLLECTION_NAME);

// say everything went fine 