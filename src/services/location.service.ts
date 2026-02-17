import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {

  }
  getAddress(address: string){
    const url = 'https://geocode-maps.yandex.ru/1.x/?apikey=91ce60c3-9067-4742-9c3c-302de08cfc30&geocode='+
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
