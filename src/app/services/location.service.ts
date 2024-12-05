import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    return {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
      timestamp: coordinates.timestamp,
    };
  }
}
