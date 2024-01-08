// this is model for the user 
// in this we will store the user related information for this purpose 
import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Types.ObjectId
    }, 
    userName : {
        type : String, 
        required : [true, "Please enter Username."]
    }, 
    email : {
        type : String, 
        required : [true, "Please Enter Email."]
    }

});

export const userModel = mongoose.model("users", userSchema); 