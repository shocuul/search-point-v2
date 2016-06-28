import {Component} from '@angular/core';
import {ViewController}  from 'ionic-angular';
import {AppProvider} from '../../providers/wp-api/app-provider';
import {AvailableCategories} from './available-cat.pipe';
import {Category} from '../../providers/wp-api/data-clases';
@Component({
    templateUrl: 'build/pages/maps/filter.html',
    pipes:[AvailableCategories]
})
export class FilterPopover {
    
    constructor(private appProvider: AppProvider){
       
    }
}