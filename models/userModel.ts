import { mongoose, Schema } from 'mongoose';
// here we have to make the interface for this puropse 
// we have to import the mongoose schema and others also according to our need for this purpose 
// import mongoose from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "Users";

// making the interface here for this purpose 
// the interface will be the same type for the user so that we can use this interface to pass or define the arguments for this purpose 
export default interface User {
    _id : mongoose.Types.ObjectId, 
    userName : mongoose.Types.ObjectId, 
    email : mongoose.Types.string
};


// now defining the model using the user interface for this purpose 
const userSchema = new mongoose.Schema<User>({
    _id : {
        type : Schema.Types.ObjectId
    }, 
    userName : {
        type : Schema.Types.String, 
        required : [true, "Please enter Username."]
    }, 
    email : {
        type : Schema.Types.String, 
        required : [true, "Please Enter Email."]
    }

});

export const userModel = mongoose.model(DOCUMENT_NAME, userSchema, COLLECTION_NAME); 