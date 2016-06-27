import {Component, ViewChildren} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {Category, Item} from '../../providers/wp-api/data-clases'
import {AppProvider} from '../../providers/wp-api/app-provider';
import {Geolocation} from 'ionic-native';
import {SearchModal} from './search';
import {SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow} from 'angular2-google-maps/core'

import {GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS}from 'angular2-google-maps/core';

@Component({
  templateUrl: 'build/pages/maps/maps.html',
  directives:[SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow],
  providers:[AppProvider, GOOGLE_MAPS_PROVIDERS]
})
export class MapsPage {
  @ViewChildren(SebmGoogleMapInfoWindow) allInfoWindows;
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

  mapClicked($event: MouseEvent){
    console.log("click");
    this.allInfoWindows.forEach(d=>{
      if(d.isOpen()){
        d.close();
      }
    })
  }

  showModal(){
    let modal = Modal.create(SearchModal)
    this.navController.present(modal);
  }
}
