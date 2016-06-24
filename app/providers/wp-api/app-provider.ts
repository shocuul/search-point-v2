import {Injectable} from '@angular/core';
import {WpApi} from './wp-api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Category, Item} from './data-clases';
import {BehaviorSubject} from 'rxjs/Rx';



/*
  Generated class for the MarkersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppProvider {

  private _categories: BehaviorSubject<Array<Category>> = new BehaviorSubject([]);

  public categories:Observable<Array<Category>> = this._categories.asObservable();

  private _items: BehaviorSubject<Array<Item>> = new BehaviorSubject([]);

  public items:Observable<Array<Item>> = this._items.asObservable();

  //categories: Array<Category>;

  constructor(private wpApi: WpApi) {
    this.loadInitialData();
  }

  getItems(latitude:number, longitude:number, radius:number = 10, category?:number, location?:number, search?:string){
    this.wpApi.getItems(latitude,longitude,radius,category,location,search).subscribe(res => {
      let items:Array<Item> = [];
      (<Object[]>res.json().map((item:any) =>{
        items.push(new Item(item.ID,item.post_content,item.post_title,item.link,item.marker,item.optionsDir.address,parseFloat(item.optionsDir.gpsLatitude),
          parseFloat(item.optionsDir.gpsLongitude), item.optionsDir.telephone, item.optionsDir.email, item.optionsDir.web, item.optionsDir.alternativeContent));
      }));
      console.log("Items");
      console.log(items);
      this._items.next(items);
    })
  }

  loadInitialData(){
    this.wpApi.getCategories().subscribe(res => {
      /*res.json().
      res.map((categories: Array<any>) => {
        let result:Array<Category> = [];
          if(categories){
            categories.forEach((category) => {
              //Push Head Categories.
              if(category.parent == 0){
                result.push(new Category(category.id, category.description, category.name, category.link, category.category_meta.icon, category.category_meta.marker, category.category_meta.excerpt));
              }
            });
            categories.forEach((category) => {
              result.forEach((parent) => {
                if(category.parent != 0){
                  if(parent._id == category.parent){
                    parent.addChilden(new Category(category.id, category.description, category.name, category.link, category.category_meta.icon, category.category_meta.marker, category.category_meta.excerpt))
                  }
                }
              })
            })
          }
          console.log(result);
          this._categories.next(result);
      });
*/
         let categories:Array<Category> = [];
         (<Object[]>res.json().map((category: any) =>{
            if(category.parent == 0)
            {
              categories.push(new Category(category.id, category.description, category.name, category.link, category.category_meta.icon, category.category_meta.marker, category.category_meta.excerpt));
            }
            }));
            (<Object[]>res.json().map((category:any) => {
              categories.map((parent:Category) => {
                if(category.parent != 0 ){
                  if(parent._id == category.parent){
                    parent.addChilden(new Category(category.id, category.description, category.name, category.link, category.category_meta.icon, category.category_meta.marker, category.category_meta.excerpt));
                  }
                }
              })
            }));
            console.log(categories);
            this._categories.next(categories);
      },
      err => console.log("Error retrieving Categories")
    );
  }
/*
  load() {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      return this.http.get('http://dummy.flyhighpr.com/wp-json/wp/v2/ait-dir-item-category?page=1&per_page=100')
        .map((responseData) => {
        return responseData.json();
        })
        .map((categories: Array<any>) => {
          let result:Array<Category> = [];
          if(categories){
            categories.forEach((category) => {
              //Push Head Categories.
              if(category.parent == 0){
                result.push(new Category(category.id, category.description, category.name, category.link, category.category_meta.icon, category.category_meta.marker, category.category_meta.excerpt));
              }
            });
            categories.forEach((category) => {
              result.forEach((parent) => {
                if(category.parent != 0){
                  if(parent._id == category.parent){
                    parent.addChilden(new Category(category.id, category.description, category.name, category.link, category.category_meta.icon, category.category_meta.marker, category.category_meta.excerpt))
                  }
                }
              })
            })
          }
          return result;
        });
  }

  getItems(latitude:number, longitude:number, radius:number = 10, category?:number, location?:number, search?:string){
    
    //resp.coords.latitude
    //resp.coords.longitude
    
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

    return this.http.post('http://dummy.flyhighpr.com/wp-json/search-point/getItems',
    body,{headers: headers})
    .map((response) => {return response.json()})
    .map((items:Array<any>) =>{
      let result:Array<Item> = [];
      if(items){
        items.forEach((item)=>{
          result.push(new Item(item.ID,item.post_content,item.post_title,item.link,item.marker,item.optionsDir.address,parseFloat(item.optionsDir.gpsLatitude),
          parseFloat(item.optionsDir.gpsLongitude), item.optionsDir.telephone, item.optionsDir.email, item.optionsDir.web, item.optionsDir.alternativeContent));
        })
      }
      return result;
    });

  }
  */
}

