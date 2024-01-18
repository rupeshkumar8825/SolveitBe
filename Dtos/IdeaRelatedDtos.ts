export class IdeaCreateRequestDto {
    ideaName : string;
    ideaDescription : string;
    createdBy : string;
    category : string;
    rating : number;
    thumbnail : string;
    othersKnow : string;
    
    constructor (ideaName : string = "", ideaDescription : string = "", createdBy : string = "", category : string = "", rating : number = 0, thumbnail : string = "", othersKnow : string = "")
    {
        this.ideaName = ideaName;
        this.ideaDescription = ideaDescription;
        this.createdBy = createdBy;
        this.category = category;
        this.rating = rating;
        this.thumbnail = thumbnail;
        this.othersKnow = othersKnow;
    }

}


export class IdeaCreateResponseDto {
    _id : string;
    ideaName : string;
    ideaDescription : string;
    
    constructor(_id : string = "", ideaName : string = "", ideaDescription : string = "")
    {
        this._id = _id;
        this.ideaName = ideaName;
        this.ideaDescription = ideaDescription;
    }
}

