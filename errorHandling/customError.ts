// here we will define our custom error main class for error handling for this purpose 

export class CustomError extends Error{
    public data : any;
    public type : string;

    constructor(message : string, data = {}, type ='GENERAL')
    {
        super(message);
        this.data = data;
        this.type = type;
    }
}

// say everything went fine 
// module.exports = CustomError

// HANDLING THE ERRORS IN THE SERVICES AND CONTROLLERS LAYERS FOR THIS PURPOSE 
    // 1. we have implemented the custom errors like the authentication errors, not found errors and so on 
    // 2. then for the synchronous functions we can directly return or throw the error. 
    // 3. for asynchronous functions we can throw the error from the services layer itself and then we will use the try catch block in the controller to catch the errors for this purpose 
    // 4. so we will throw the error in the services and it will be catched inside the controllers folder and then we will have to call the next function into this which will be passed to the global error middleware for this purpose 