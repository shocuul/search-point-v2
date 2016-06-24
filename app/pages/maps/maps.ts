import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {Category, Item} from '../../providers/wp-api/data-clases'
import {AppProvider} from '../../providers/wp-api/app-provider';
import {Geolocation} from 'ionic-native';
import {SearchModal} from './search';

import {GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS}from 'angular2-google-maps/core';

@Component({
  templateUrl: 'build/pages/maps/maps.html',
  directives:[GOOGLE_MAPS_DIRECTIVES],
  providers:[GOOGLE_MAPS_PROVIDERS, AppProvider]
})
export class MapsPage {
  lat: number;
  lng: number;
  constructor(private navController: NavController, private appProvider: AppProvider) {
    this.loadMap();
  }
  loadMap(){
    Geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.appProvider.getItems(resp.coords.latitude,resp.coords.longitude);
    });
  }

  showModal(){
    let modal = Modal.create(SearchModal)
    this.navController.present(modal);
  }
}
