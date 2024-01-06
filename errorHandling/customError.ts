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