import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  public selectedId: string = '';

  constructor(private placesService: PlacesService,
    private mapService: MapService) { }

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadinPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {

    if (!this.placesService.userLocation) throw Error('No existe la ubicacion inicial');

    this.placesService.deletePlaces();

    const start = this.placesService.userLocation!;
    const end = place.center as [number, number];

    this.mapService.getRouteBetweenPoints(start, end)
  }

}
