import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
// import {State} from '../components/recipes/models/state.model'
import 'rxjs/Rx';

@Injectable()
export class LightService {

  public prevResponse:any
  
    constructor(private http:Http) { }
  
    getLightState(id): Observable<any>{
  
      return this.http.get('http://localhost:8080/api/newdeveloper/lights/'+id)
      .map(res => res.json());
    }
    
    setHueState(hueSetting, isOn, brightness){
      var state={ hue: hueSetting,
      on: isOn,
      bri: brightness};
      console.log('put was called')
    
      return this.http.put('http://localhost:8080/api/newdeveloper/lights/1/state', state)
        .map(
          res => res.json());
     
    }
  
    setLightName(newName){
      var name= {name: newName}
      return this.http.put('http://localhost:8080/api/newdeveloper/lights/1', name)
        .map(
          res =>res.json()
        )
    }
    getAllLights(){
      return this.http.get('http://localhost:8080/api/newdeveloper/lights').map(res => res.json())
    }

}
