import {Component} from '@angular/core';
import {ViewController}  from 'ionic-angular';
import {AppProvider} from '../../providers/wp-api/app-provider';

@Component({
    templateUrl: 'build/pages/maps/search.html'
})
export class SearchModal{
    constructor(private viewCtrl: ViewController, private appProvider: AppProvider){

    }
    close(){
        this.viewCtrl.dismiss();
    }
}