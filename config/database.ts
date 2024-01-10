// here we will write the code for the database connection for this purpose 
const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, 
        {
            useNewUrlParser : true, useUnifiedTopology : true
        }).then((data : any) => {
            console.log(`MongoDB connected with the server with ${data.connection.host}`);
        }).catch((error : any) => {
            console.log(error);
        })

}

export default connectDatabase;