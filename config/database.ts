import * as dotenv from 'dotenv';
import AppConfig from './appConfig';
// here we will write the code for the database connection for this purpose 
const mongoose = require("mongoose");

dotenv.config();

const connectDatabase = () => {
    console.log("inside the connect database function for this purpose \n");
    console.log("the value of the database env variable is as follows \n", AppConfig.db.dbUri)
    mongoose.connect(AppConfig.db.dbUri, 
        {
            useNewUrlParser : true, useUnifiedTopology : true
        }).then((data : any) => {
            console.log(`MongoDB connected with the server with ${data.connection.host}`);
        }).catch((error : any) => {
            console.log(error);
        })

}

export default connectDatabase;