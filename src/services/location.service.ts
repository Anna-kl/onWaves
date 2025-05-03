import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {

  }
  getAddress(address: string){
    const url = 'https://geocode-maps.yandex.ru/1.x/?apikey=a2c8035f-05f9-4489-aea1-ad9b2a841572&geocode='+
      address+'&format=json'

    return this.http.get(url);
  }
  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
}
