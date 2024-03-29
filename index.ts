import * as dotenv from "dotenv";
import AppConfig from "./config/appConfig";
// import { createServer } from "http";
import Logger from "./utils/logger";
import { createServer } from "./server";
import connectDatabase from "./config/database";
dotenv.config();



const PORT = AppConfig.app.port;

// using the function to start the server using the function called as the createserver 
const startServer = () => {
    const app = createServer();
    const serverInstance = app.listen(PORT, () => {
        Logger.debug (
            `App ${AppConfig.app.name} with api version ${AppConfig.app.apiVersion} is starting`
        );
        Logger.debug(`App is listening on port ${PORT}`);
    });

    // returning the server that we have created is as follows 
    return serverInstance;
}

// calling the function for this purpose 
startServer();
// after this we have to start the database server 
connectDatabase();