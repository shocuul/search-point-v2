import {Component} from '@angular/core';
import {ViewController}  from 'ionic-angular';
import {AppProvider} from '../../providers/wp-api/app-provider';
import {Category} from '../../providers/wp-api/data-clases';
import {Observable} from 'rxjs/Observable';
@Component({
    templateUrl: 'build/pages/maps/filter.html'
})
export class FilterPopover {


    filter: Observable<Category[]>;
    constructor(private appProvider: AppProvider){
       this.filter = this.appProvider.filter;
       console.log(this.filter);
    }
}