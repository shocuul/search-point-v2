class Post {
    _id:number;
    _description:string;
    _name:string;
    _link:string;
    constructor(id:number, description:string, name:string, link:string){
        this._id = id;
        this._description = description;
        this._name = name;
        this._link = link;
    }
}

export class Category extends Post{
    _children:Category[];
    _items:Item[];
    _icon:string;
    _marker:string;
    _excerpt:string;
    _available:boolean = false;
    constructor(id:number, description:string, name:string,link:string,icon:string, marker:string, excerpt:string){
        super(id,description,name,link);
        this._icon = icon;
        this._marker = marker;
        this._excerpt = excerpt;
        
    }

    deleteChild(child:Category){
        this._children = this._children.filter(item => item._id !== child._id);
    }

    setAvailable(){
        this._available = true;
    }
    
    setUnavailable(){
        this._available = false;
    }
    addChilden(child:Category){
        if(this._children == undefined){
            this._children = new Array<Category>();
        }
        this._children.push(child);
    }
}
interface SocialData{
    img: string;
    link:string;
}

export class Location extends Post{
    _children:Location[];
    _icon:string;
    _excerpt:string;
    constructor(id:number, description:string, name:string, link:string, icon:string, excerpt:string){
        super(id,description,name,link);
        this._icon = icon;
        this._excerpt = excerpt;
    }

    addClildren(child:Location){
        if(this._children == undefined){
            this._children = new Array<Location>();
        }
        this._children.push(child);
    }
}

export class Item extends Post{
    _category_id:number;
    _marker:string;
    _address:string;
    _gpsLatitude:number;
    _gpsLongitude:number;
    _telephone:string;
    _email:string;
    _web:string;
    _hoursMonday:string;
    _hoursTuesday:string;
    _hoursWednesday:string;
    _hoursThursday:string;
    _hoursFriday:string;
    _hoursSaturday:string;
    _hoursSunday:string;
    _alternativeContent:string;
    _social:SocialData[];
    _gallery:string[];
    constructor(id:number, description:string, name:string, link:string, category_id:number, marker:string, address:string, gpsLatitude:number, gpsLongitude:number, telephone:string, email:string, web:string, alternativeContent:string){
        super(id,description,name,link);
        this._category_id = category_id;
        this._marker = marker;
        this._address = address;
        this._gpsLatitude = gpsLatitude;
        this._gpsLongitude = gpsLongitude;
        this._telephone = telephone;
        this._email = email;
        this._web = web;
        this._alternativeContent = alternativeContent;
    }

    setHours(monday:string, tuesday:string, wednesday:string, thursday:string, friday:string, saturday:string, sunday:string){
        this._hoursMonday = monday;
        this._hoursThursday = thursday;
        this._hoursWednesday = wednesday;
        this._hoursThursday = thursday;
        this._hoursFriday = friday;
        this._hoursSaturday = saturday;
        this._hoursSunday = sunday;
    }

    setSocial(social:SocialData[]){
        this._social = social;
    }

    setGallery(gallery:string[]){
        this._gallery = gallery;
    }

    

}