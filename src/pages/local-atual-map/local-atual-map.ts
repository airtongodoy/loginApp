import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { ChangeDetectorRef } from "@angular/core";
import {
  GoogleMap
  // ,GoogleMaps
  // ,GoogleMapsEvent
  // ,Marker
  // ,GoogleMapsAnimation
  // ,MyLocation
} from '@ionic-native/google-maps';
/**
 * Generated class for the LocalAtualMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-local-atual-map',
  templateUrl: 'local-atual-map.html',
})

export class LocalAtualMapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  private markers = [];
  records = [];

  constructor(navCtrl: NavController, public geolocation: Geolocation, private cdr: ChangeDetectorRef) { }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then(position => {
      this.initializeMap(position.coords.latitude, position.coords.longitude);
    });
  }

  initializeMap(currentLat, currentLong) {
      console.log('Novo teste');

      // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let latLng = new google.maps.LatLng(currentLat, currentLong);

      let mapOptions = {
        position: latLng,
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

       var startPosition = new google.maps.LatLng(currentLat, currentLong);

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      this.addMarker(startPosition);
    }

  addMarker(latLng) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    let content = "<h4>Informação!</h4>";
    this.markers.push(marker);
    this.addInfoWindow(marker, content);
    marker.setMap(this.map);

    this.cdr.detectChanges();
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
