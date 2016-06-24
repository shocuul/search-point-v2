import {Component} from '@angular/core';
import {ViewController}  from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/maps/search.html'
})
export class SearchModal{
    constructor(private viewCtrl: ViewController){

    }
    close(){
        this.viewCtrl.dismiss();
    }
}