import {Injectable} from '@angular/core';
import {WpApi} from './wp-api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Category, Item, Location} from './data-clases';
import {BehaviorSubject, ReplaySubject} from 'rxjs/Rx';




/*
  Generated class for the MarkersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppProvider {

  //Categories

  private _categories: BehaviorSubject<Array<Category>> = new BehaviorSubject([]);

  public categories:Observable<Array<Category>> = this._categories.asObservable();

  private _baseCategories:Array<Category>;

  private _filter: BehaviorSubject<Array<Category>> = new BehaviorSubject([]);

  public filter:Observable<Array<Category>> = this._filter.asObservable();


  //Items

  private _items: BehaviorSubject<Array<Item>> = new BehaviorSubject([]);

  public items:Observable<Array<Item>> = this._items.asObservable();

  private _baseItems : Array<Item>;

  //Locations

  private _locations: BehaviorSubject<Array<Location>> = new BehaviorSubject([]);

  public locations:Observable<Array<Location>> = this._locations.asObservable();

  public _availableCategoryId:number[];

  //categories: Array<Category>;

  constructor(private wpApi: WpApi) {
    this.loadInitialData();
    this._availableCategoryId = new Array<number>();
  }

  getItems(latitude:number, longitude:number, radius:number = 10, category?:number, location?:number, search?:string){
    this.wpApi.getItems(latitude,longitude,radius,category,location,search).subscribe(res => {
      let items:Array<Item> = [];
      (<Object[]>res.json().map((item:any) =>{
        items.push(new Item(item.ID,item.post_content,item.post_title,item.link,parseInt(item.category_id),item.marker,item.optionsDir.address,parseFloat(item.optionsDir.gpsLatitude),
          parseFloat(item.optionsDir.gpsLongitude), item.optionsDir.telephone, item.optionsDir.email, item.optionsDir.web, item.optionsDir.alternativeContent));
      }));
      items.forEach((item:Item)=>{
        if(0 > this._availableCategoryId.indexOf(item._category_id)){
          this._availableCategoryId.push(item._category_id);
        }
      })
      this._items.next(items);
      this.filterCategories();
      this._baseItems = items;
    })
  }

  public filterItems(catId:number){
    this.restoreItems();
    //this._baseItems = this._items.getValue();
    let items:Array<Item> = this._items.getValue();
    
    items = items.filter(item => item._category_id === catId);
    console.log(items);
    this._items.next(items);
    //this._items.next(this._items.getValue().filter(item => item._category_id === catId));
  }

  restoreItems(){
    this._items.next(this._baseItems);
  }

  public filterCategories(){
    let allCategories:Array<Category> = this._categories.getValue();
    //console.log("Before Filter");
    //console.log(allCategories);
    //allCategories.splice(0,2);
    
    allCategories.forEach((parent:Category,indexParent:number)=>{
            parent._children.forEach((child:Category, indexChild:number)=>{
                console.log(parent._name + ' ' + indexChild);

                if(this._availableCategoryId.indexOf(child._id) > -1){
                    child.setAvailable();
                }else{
                    parent.deleteChild(child);
                }
            })
                if(this._availableCategoryId.indexOf(parent._id) > -1){
                    parent.setAvailable();
                }else{
                    if(parent._children.length == 0){
                        allCategories = allCategories.filter(item => item._id !== parent._id);
                    }else{
                      //parent.setAvailable();
                    }
                }
                
                
      })
      //console.log("After Filter");
      //console.log(allCategories);
      
      this._filter.next(allCategories);
      console.log(this._filter.getValue());
      
      //console.log(this._filter.value);
    
  }

  resetAvailableCategories(){
    this._categories.next(this._baseCategories);
  }

  loadInitialData(){
    this.wpApi.getLocations().subscribe(res => {
      let locations:Array<Location> = [];
      (<Object[]>res.json().map((location: any)=>{
        if(location.parent == 0){
          locations.push(new Location(location.id, location.description, location.name,location.link, location.location_meta.icon, location.location_meta.excerpt));
        }
      }));
      (<Object[]> res.json().map((location:any) => {
        locations.map((parent:Location) => {
          if(location.parent != 0){
            if(parent._id == location.parent){
              parent.addClildren(new Location(location.id, location.description, location.name, location.link, location.location_meta.icon, location.location_meta.excerpt));
            }
          }
        })
      }));
      this._locations.next(locations);
    })
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
            this._baseCategories = categories;
            //this._filter.next(categories);
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

