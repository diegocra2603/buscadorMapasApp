import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styles: [`
  .map-container{
    position:fixed;
    top:0px;
    right:0px;
    width:100vw;
    height:100vh;
  }`]
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(private placesServices: PlacesService,
              private mapService:MapService) { }

  ngAfterViewInit(): void {

    if(!this.placesServices.userLocation)
      throw Error('No hay placesService.userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placesServices.userLocation,
      zoom: 14
  });

  const popup = new Popup()
    .setHTML(`
      <h6>Aqui estoy</h6>
      <span>Estoy en este lugar del mundo</span>
    `);

    new Marker({color:'red'})
    .setLngLat(this.placesServices.userLocation)
    .setPopup(popup)
    .addTo(map)

    this.mapService.setMap(map);

  }



}
