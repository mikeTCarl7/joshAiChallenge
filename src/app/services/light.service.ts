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
  // public lightData: LightData;

    constructor(private http: Http, private lightdata: LightData) {


      // this.getLightStateToLTData(1);
     }
    getLightState(id): Observable<any> {
      return this.http.get('http://localhost:8080/api/newdeveloper/lights/' + id)
      .map(res => res.json());
    }
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


    getLightStateToLTData(id) { // this method is for a value object that has on been implemented yet
          this.http.get('http://localhost:8080/api/newdeveloper/lights/' + id)
          .map(res => {
            const toValueObject: any =
            res.json();
          return toValueObject;
          }).subscribe(
            (toValueObject: any) => {
              this.lightdata.setLightData(toValueObject, 1);  //DELETE 1 in the params area of the function to the left
            });
        }

        setAllLightNamesAndIDs(jsonObject:any){
            const me: Array<LightNameAndID> = [];
            for ( let i = 1; i < Object.keys(jsonObject).length + 1 ; i++ ) {
              // let Inum = i-1;
              var temp = {
                  name: '',
                  id: ''
              };

              temp.id = i.toString();
              console.log('json object below');
              console.log(jsonObject[i].name);
              temp.name = jsonObject[i].name;
  // debugger
              console.log('about to print temp');
              // console.log(this.temp);
              me.push(temp);
              console.log('about to print me');
              console.log(me);

            }
            return me;

          }

          getLightState2(id) {
            return this.http.get('http://localhost:8080/api/newdeveloper/lights/' + id)
            .map(res => {
              console.log(res.json());
              res.json();

            });
          }


    //   getLightData(): Observable<any> {
    //     console.log('get light data baout to be called');
    //     return this.http.get('http://localhost:8080/api/newdeveloper/lights')
    //       .map((res: any) => {
    //         console.log(res);
    //         let jsonObject: any = res.json();
    //         console.log(res.json());
    //         return this.setAllLightNamesAndIDs(jsonObject);
    //       }).flatMap((me: any) => {
    //         console.log('my value');
    //         console.log(me);
    //         return this.http.get('http://localhost:8080/api/newdeveloper/lights/' + me[1].id)
    //         .map((res: any) => {
    //           console.log(res);
    //           res.json();
    //         });

    //   });
    // }



    getLightData2(): Observable<any> {
      console.log('get light data baout to be called');
      return this.http.get('http://localhost:8080/api/newdeveloper/lights')
        .map((res: any) => {
          console.log(res);
          let jsonObject: any = res.json();
          console.log(res.json());
          return this.setAllLightNamesAndIDs(jsonObject);
        }).flatMap((me: any) => {
           return Observable.forkJoin(me.map((m) => {
             console.log(m.id + 'is the id in which we are printing');
             return this.http.get('http://localhost:8080/api/newdeveloper/lights/' + m.id)
             .map((res: Response) => {
                res.json();
                let mx: LightData;
                // const mx: Array<LightData> =[];
               mx = this.lightdata.setLightData2(res.json(), m.id );
               return mx;
              //  return <any[]>res.json();
              //  console.log('about to print final return');
              //  console.log(res.json());
              //  res.json();
             }
              );

           }));
        });
  }

}
