// in this we will mention all the DTOs that will be used for user related functionalities 
export class UserCreateRequestDto {
    userName : string; 
    email : string;

    constructor(userName : string, email : string)
    {
        this.userName = userName, 
        this.email = email
    };

    
};

