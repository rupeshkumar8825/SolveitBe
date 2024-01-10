import * as dotenv from 'dotenv';
// this is the configruation file for the current solveit backend application for this purpose 
// here we have to setthe values for this purpose 
dotenv.config();


const AppConfig = {
    // config related to the application or the server only are mentioned below for this purpose 
    app : {
        name : process.env.APP_NAME, 
        server : process.env.SERVER, 
        isDevelopment : ['development', 'dev', 'local'].includes(
            <string> process.env.SERVER
        ), 
        port : parseInt(<string>process.env.PORT, 10) | 4000,
        apiVersion : process.env.API_VERSION || 'v1', 
        secret : process.env.SECRET || 'somescafaslkdf&*(&*(&2w3r'
    }, 


    // creating the configuration related to the database server for this purpose 
    db : {
        host : process.env.DB_HOST, 
        database : process.env.DB_DATABASE, 
        username : process.env.DB_USERNAME, 
        password : process.env.DB_PASSWORD, 
        port : parseInt(<string>process.env.DB_PORT, 10) || 5432, 
        dialect : process.env.DB_DIALECT || 'postgres', 
        isLogging : process.env.DB_LOG === 'true'
          

    }
};

// we will be using the object.freeze functionality here to make sure that the values do not get changed on the run time for this purpose 
export default AppConfig;