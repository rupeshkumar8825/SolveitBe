// this is the service response dto 
// in the below format itself all the services will be returning the response to the controller 

export class ServiceResponse <T>{
    data : T;
    message : string;
    success : boolean;

    constructor(data : T, message : string, success : boolean)
    {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}