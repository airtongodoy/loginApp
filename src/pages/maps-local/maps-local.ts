import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MapsLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-maps-local',
  templateUrl: 'maps-local.html',
})


export class MapsLocalPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geo: Geolocation) {


  };

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  map: any;
  mapX: any;

  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  position : any;

  currentLat: any;
  currentLong: any;

  ionViewDidLoad() {


    let watch = this.geo.watchPosition();

    const mapOptions = {
      zoom: 18,
      center: this.position,
      disableDefaultUI: true
    }

    this.geo.getCurrentPosition().then(res => {
        this.currentLat =  res.coords.latitude;
        this.currentLong = res.coords.longitude;

        this.initializeMap(this.currentLat, this.currentLong);
    }).catch(() => {
        alert("erro ao pegar geolocalizacao ");
    });

  }

  public ccc() {
    const mapOptions = {
      zoom: 18,
      center: this.position,
      disableDefaultUI: true
    }

    this.mapX = new google.maps.Map(document.getElementById('mapX'), mapOptions);

    const marker = new google.maps.Marker({
      position: this.position,
      mapX: this.mapX,

      //Titulo
      title: 'Minha posição',

      //Animção
      animation: google.maps.Animation.DROP, // BOUNCE

      //Icone
      icon: '../../assets/imgs/avatar/marty-avatar.png'
    });
  }

  initializeMap(currentLat, currentLong) {
    this.startPosition = new google.maps.LatLng(currentLat, currentLong);

    const mapOptions = {
      zoom: 18,
      center: this.startPosition,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsDisplay.setMap(this.map);

    const marker = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
    });
  }

  success(pos) {

  };

  calculateRoute() {
    if (this.destinationPosition && this.originPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.originPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }



}
