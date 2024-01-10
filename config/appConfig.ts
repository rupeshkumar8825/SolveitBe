// this is the configruation file for the current solveit backend application for this purpose 
const AppConfig = {
    // config related to the application or the server only are mentioned below for this purpose 
    app : {
        name : process.env.APP_NAME, 
        server : process.env.SERVER, 
        isDevelopment : ['development', 'dev', 'local'].includes(
            <string> process.env.SERVER
        ), 
        port : parseInt(<string>process.env.PORT, 10) | 3000,
        apiVersion : process.env.API_VERSION || 'v1', 
        secret : process.env.SECRET || 'somescafaslkdf&*(&*(&2w3r'
    }, 

}