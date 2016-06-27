import {Injectable, Inject} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Category, Item} from './data-clases';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WpApi {
    constructor(public http: Http){}

    getCategories(){
        return this.http.get('http://dummy.flyhighpr.com/wp-json/wp/v2/ait-dir-item-category?page=1&per_page=100');
    }

    getLocations(){
        return this.http.get('http://dummy.flyhighpr.com/wp-json/wp/v2/ait-dir-item-location?page=1&per_page=100');
    }

    getItems(latitude:number, longitude:number, radius:number = 10, category?:number, location?:number, search?:string){
        var body = "lat=" + latitude + "&lon=" + longitude + "&radius=" + radius;
        if(category != undefined){
        body = body.concat("&cat=" + category);
        }
        if(location != undefined){
        body = body.concat("&loc=" + location);
        }
        if(search != undefined){
        body = body.concat("&search=" + search);
        }

        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');

        return this.http.post('http://dummy.flyhighpr.com/wp-json/search-point/getItems',body,{headers: headers}).share();
    }
}