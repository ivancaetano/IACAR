import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }
  getGeocode(location) {
    let params = new HttpParams()
      .set("key", "AIzaSyDjlr5mw3qsJ3fHNQ5JQlw-WbAgR_sjW-4")
      .set("sensor", "true")
      .set("latlng", location.latitude + "," + location.longitude);
    return this.http.get(environment.endpointGoogle + "/maps/api/geocode/json", { params: params });
  }
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface Bounds {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Location {
  lat: number;
  lng: number;
}


export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Geometry {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Viewport;
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
  plus_code: PlusCode;
}

export interface GeoCode {
  plus_code: PlusCode;
  results: Result[];
  status: string;
}


