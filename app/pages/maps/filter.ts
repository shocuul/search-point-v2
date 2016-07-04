import {Component} from '@angular/core';
import {ViewController, NavParams}  from 'ionic-angular';
import {AppProvider} from '../../providers/wp-api/app-provider';
import {Category} from '../../providers/wp-api/data-clases';
import {Observable} from 'rxjs/Observable';

@Component({
    templateUrl: 'build/pages/maps/filter.html'
})
export class FilterPopover {
    


    filter: Array<Category>;
    provider: AppProvider;
    constructor(private view: ViewController, private params: NavParams){
        //console.log(params.get('provider'));
        //var filter:Observable<Array<Category>> = params.get('cat');
        //filter.subscribe((data) => this.filter = data);
       //this.filter = this.appProvider.filter;
        this.provider = params.get('provider');
        this.provider.filter.subscribe((data) => this.filter = data);
       //console.log(this.filter);
    }
    filterData(category:Category){
        this.provider.filterItems(category._id);
        this.view.dismiss();
        console.log(category._id);
    }

}