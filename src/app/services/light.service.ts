import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
// import {State} from '../components/recipes/models/state.model'
import 'rxjs/Rx';

import { LightData} from './lightdata.service';
import { LightNameAndID } from '../models/lightNameAndID.model';


@Injectable()
export class LightService {

  public prevResponse: any;

    constructor(private http: Http, private lightdata: LightData) { }

    setHueState(hueSetting, isOn, brightness) {
      const state = { hue: hueSetting,
      on: isOn,
      bri: brightness};
      console.log('put was called');
      return this.http.put('http://localhost:8080/api/newdeveloper/lights/1/state', state)
        .map(
          res => res.json());
    }

    setLightName(newName) {
      const name = {name: newName };
      return this.http.put('http://localhost:8080/api/newdeveloper/lights/1', name)
        .map(
          res => res.json()
        );
    }
    getAllLights() {
      return this.http.get('http://localhost:8080/api/newdeveloper/lights').map(res => res.json())
    }

      setAllLightNamesAndIDs(jsonObject: any) {
            const NamesAndIDs: Array<LightNameAndID> = [];
            for ( let i = 1; i < Object.keys(jsonObject).length + 1 ; i++ ) {
              // let Inum = i-1;
              var temp = {
                  name: '',
                  id: ''
              };
              temp.id = i.toString();
              temp.name = jsonObject[i].name;
              NamesAndIDs.push(temp);
            }
            return NamesAndIDs;
          }


    getLightData(): Observable<any> {

      return this.http.get('http://localhost:8080/api/newdeveloper/lights')
        .map((res: any) => {
          const jsonObject: any = res.json();
          return this.setAllLightNamesAndIDs(jsonObject);
        }).flatMap((lightNamesAndIDs: any) => {
           return Observable.forkJoin(lightNamesAndIDs.map((lightNameAndID) => {
 
             return this.http.get('http://localhost:8080/api/newdeveloper/lights/' + lightNameAndID.id)
             .map((res: Response) => {
                res.json();
                let lightData: LightData;

               lightData = this.lightdata.setLightData(res.json(), lightNameAndID.id );
               return lightData;
             }
              );

           }));
        });
  }

}
