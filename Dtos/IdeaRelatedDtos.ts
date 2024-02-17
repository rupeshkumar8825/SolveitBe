export class IdeaCreateRequestDto {
    ideaName : string;
    ideaDescription : string;
    createdBy : string;
    category : string;
    rating : string;
    thumbnail : File;
    othersKnow : string;
    
    constructor (ideaName : string = "", ideaDescription : string = "", createdBy : string = "", category : string = "", rating : string = "", thumbnail : File, othersKnow : string = "")
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


export class IdeaThumbnailResponseDto {
    _id : string;
    thumbnail : string

    constructor(id : string, thumbnail : string)
    {
        this._id = id; 
        this.thumbnail = thumbnail;
    }
}
