import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Category, Item} from '../../providers/wp-api/data-clases'
import {AppProvider} from '../../providers/wp-api/app-provider';
import {Geolocation} from 'ionic-native';

import {GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS}from 'angular2-google-maps/core';

@Component({
  templateUrl: 'build/pages/maps/maps.html',
  directives:[GOOGLE_MAPS_DIRECTIVES],
  providers:[GOOGLE_MAPS_PROVIDERS, AppProvider]
})
export class MapsPage {
  lat: number;
  lng: number;
  constructor(private navController: NavController) {
    this.loadMap();
  }
  loadMap(){
    Geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }
  }
}
