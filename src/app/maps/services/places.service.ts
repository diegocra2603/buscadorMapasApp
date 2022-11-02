import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api/';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  public isLoadinPlaces: boolean = false;

  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation
  }

  constructor(private placeApi: PlacesApiClient,
    private mapService: MapService) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude]
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se puo obtener la geolocalizacion');
          console.error(err);
          reject();
        });

    })

  }

  getPlacesByQuery(query: string = '') {

    if (query.length === 0) {
      this.isLoadinPlaces = false;
      this.places = [];
      return;
    }

    if (!this.userLocation)
      throw new Error('No existe el user location');

    this.isLoadinPlaces = true;

    this.placeApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation?.join(',')
      }
    })
      .subscribe(resp => {
        this.isLoadinPlaces = false;

        this.places = resp.features;

        this.mapService.createMarkersFromPlaces(this.places, this.userLocation!);

      });

  }

  deletePlaces(){
    this.places = [];
  }

}
