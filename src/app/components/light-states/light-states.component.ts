import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {LightService} from '../../services/light.service'
import {Light} from '../../models/light.model'
import {State} from '../../models/state.model'
import {Light1, Light2, AllLights} from '../../models/all-lights.model';

import {Pointsymbol} from '../../models/state.model'
import {RootObject} from '../../models/state.model'


import 'rxjs/Rx';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-light-states',
  templateUrl: './light-states.component.html',
  styleUrls: ['./light-states.component.css']
})
export class LightStatesComponent implements OnInit {

  stateSummary=
  {  
    name:'',
    id:'',
    on:'',
    brightness:0
 }

  // constructor( private http: Http, public svc:LightService) {
  //   this.stateSummary.name='Red Lamp';
  //  }


   constructor( private http: Http, public svc:LightService) { }

  private tick:number;
  private subscription:Subscription;
  prevState:any;
  response:any;
  lights:Array<Light>
  light:Light
  state:RootObject
  s1:State
  pointSymbol:Pointsymbol
  allLights:AllLights
  
    ngOnInit() {


      this.getAllLights()
  
      this.setHueState(5000, true, 100);
      this.getState();
  
      let timer = TimerObservable.create(2000, 1000);
      this.subscription = timer.subscribe(t => {
        this.tick = t;
        this.getState()
      });
    }
    ngOnDestroy(){
      this.subscription.unsubscribe()
    }
  
    getPreviousResponse(){
      console.log(this.svc.prevResponse);
  
      }
    getState(){
  
      if(this.state==null){  //first Call
  
        this.svc.getHueState().subscribe(res =>{
          this.state=res;
          this.pointSymbol=res.pointsymbol;
          // this.s1=res.state;
        
          this.stateSummary.on=res.state.on;
          console.log(this.stateSummary.on + 'is the state summary on property')
          this.stateSummary.brightness=res.state.bri;
          this.prevState=res.state;
          console.log('state response is next')
          console.log(this.prevState);
        })
      }
      else{
        this.svc.getHueState().subscribe(res =>{
          // debugger
          if((this.prevState.on!=res.state.on)||(this.prevState.bri!=res.state.bri)){//detect change to on/off or brightness
              //not equal to previous then set and print state
            this.state=res;
            this.pointSymbol=res.pointsymbol;
            this.stateSummary.on=res.state.on;
            this.stateSummary.brightness=res.state.bri;
            this.prevState=res.state;
            console.log(this.stateSummary);
          }
          });
          }
      }

      getStateForBtn(){
  
        this.svc.getHueState().subscribe(res =>{
            this.state=res;
            this.pointSymbol=res.pointsymbol;
            this.s1=res.state;
            this.prevState=this.state;
            console.log(this.state);
          });
      }

      setHueState(hueSetting, isOn, brightness){
        this.svc.setHueState(hueSetting, isOn, brightness).subscribe(res => {
          this.response=res;
          // this.prevState. 
          console.log(this.response)
          console.log('put was Called')});
        }

      getAllLights(){
        this.svc.getAllLights().subscribe(res => {
          this.allLights=res;
          console.log(Object.keys(res).length + 'is the json length')
          console.log(res.lenght + 'is the json lenght')
          console.log(this.allLights["1"].name);
          this.stateSummary.name=this.allLights["1"].name;
          this.stateSummary.id="1";
          console.log(this.stateSummary.id);
        })
      }
      setLightName(){

        this.svc.setLightName('Red Lamp').subscribe(res => res);

      }
}
// [  
//   {  
//      "name":"Red Lamp",
//      "id":"1",
//      "on":true,
//      "brightness":45
//   },
//   {  
//      "name":"Green Lamp",
//      "id":"2",
//      "on":false,
//      "brightness":100
//   }
// ]

