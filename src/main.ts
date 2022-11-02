import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiZGllZ29jcmEyNiIsImEiOiJjbDdidzNwOHkwcHR4M3Vxa2o5NTl5cDEyIn0.roKQGRXEKBbS_cg7JDoYkw';

if(!navigator.geolocation){
  alert('Navegador no soporta la geolocalizacion');
  throw new Error('Navegador no soporta la Geolocalizacion')
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
