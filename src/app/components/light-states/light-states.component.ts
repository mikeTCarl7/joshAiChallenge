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

  stateSummaryLight1=
  {  
    name:'',
    id:'1',
    on:'',
    brightness:0
 }

 stateSummaryLight2=
 {
  name:'',
  id:'',
  on:'',
  brightness:0
 }

 stateSummaries:Array<any>

   constructor( private http: Http, public svc:LightService) { }

  private tick:number;
  private subscription:Subscription;
  prevStateLight1:any;
  prevStateLight2:any
  response:any;
  lights:Array<Light>
  light:Light
  stateLight1:RootObject
  stateLight2:RootObject
  s1:State
  pointSymbol:Pointsymbol
  allLights:AllLights
  
    ngOnInit() {


      this.getAllLights()
  
      // this.setHueState(5000, true, 100);
      this.getStateLight1();
      this.getStateLight2();
//check state changes on interval      
      let timer = TimerObservable.create(2000, 1000);
      this.subscription = timer.subscribe(t => {
        this.tick = t;
        this.getStateLight1();
        this.getStateLight2();
      });
    }
//unsubscribe from observables    
    ngOnDestroy(){
      this.subscription.unsubscribe()
    }
//for debugging   
    getPreviousResponse(){
      console.log(this.svc.prevResponse);
      }

//get the state of the light      
    getStateLight1(){
  
      if(this.stateLight1==null){  //first Call
  
        this.svc.getLightState(1).subscribe(res =>{
          this.stateLight1=res;
          this.pointSymbol=res.pointsymbol;
        
          this.stateSummaryLight1.on=res.state.on;
          this.stateSummaryLight1.brightness=res.state.bri;
          this.prevStateLight1=res.state;
          console.log('name:' + this.stateSummaryLight1.name + '\n'+'id:' + this.stateSummaryLight1.id+'\n'+
            'on: '+ this.stateSummaryLight1.on+'\n' + 'brightness: ' +this.stateSummaryLight1.brightness);
        })
      }

      else{
        this.svc.getLightState(1).subscribe(res =>{
          // debugger
          let switchChange:boolean
          let brightnessChange:boolean

          
          if((this.prevStateLight1.on!=res.state.on)&&((this.prevStateLight1.bri!=res.state.bri))) //change to on/off switch and brightness: PRINT BOTH
          {
            this.stateLight1=res;
            this.stateSummaryLight1.on=res.state.on;
            this.stateSummaryLight1.brightness=res.state.bri;
            this.prevStateLight1=res.state;
            console.log('id:' + this.stateSummaryLight1.id);
            console.log('on: '+ this.stateSummaryLight1.on);
            console.log('brightness: ' +this.stateSummaryLight1.brightness);
          }
          if((this.prevStateLight1.on!=res.state.on)&&((this.prevStateLight1.bri==res.state.bri))) //change to on/off switch but NOT brightness: PRINT on/off
          {
            this.stateLight1=res;
            this.stateSummaryLight1.on=res.state.on;
            this.stateSummaryLight1.brightness=res.state.bri;
            this.prevStateLight1=res.state;
            console.log('id:' + this.stateSummaryLight1.id);
            console.log('on: '+ this.stateSummaryLight1.on);
          }

          if((this.prevStateLight1.on==res.state.on)&&((this.prevStateLight1.bri!=res.state.bri))) //change to brightness but NOT on/off switch: PRINT brightness
            {
            this.stateLight1=res;
            this.stateSummaryLight1.on=res.state.on;
            this.stateSummaryLight1.brightness=res.state.bri;
            this.prevStateLight1=res.state;
            console.log('id:' + this.stateSummaryLight1.id);
            console.log('brightness: ' + this.stateSummaryLight1.brightness);
            }
          });
        }
      }

//get the state of the light
      getStateLight2(){
        
            if(this.stateLight2==null){  //first Call
        
              this.svc.getLightState(2).subscribe(res =>{
                this.stateLight2=res;
                this.pointSymbol=res.pointsymbol;
              
                this.stateSummaryLight2.on=res.state.on;
                this.stateSummaryLight2.brightness=res.state.bri;
                this.prevStateLight2=res.state;
                console.log('name:' + this.stateSummaryLight2.name + '\n'+'id:' + this.stateSummaryLight2.id+'\n'+
                'on: '+ this.stateSummaryLight2.on+'\n' + 'brightness: ' +this.stateSummaryLight2.brightness);
              })
            }
      
            else{
              this.svc.getLightState(2).subscribe(res =>{
                // debugger
                if((this.prevStateLight2.on!=res.state.on)&&((this.prevStateLight2.bri!=res.state.bri))) //change to on/off switch and brightness: PRINT BOTH
                {
                  this.stateLight1=res;
                  this.stateSummaryLight2.on=res.state.on;
                  this.stateSummaryLight2.brightness=res.state.bri;
                  this.prevStateLight2=res.state;
                  console.log('id:' + this.stateSummaryLight2.id);
                  console.log('on: '+ this.stateSummaryLight2.on);
                  console.log('brightness: ' +this.stateSummaryLight2.brightness);
                }
                if((this.prevStateLight2.on!=res.state.on)&&((this.prevStateLight2.bri==res.state.bri))) //change to on/off switch but NOT brightness: PRINT on/off
                {
                  this.stateLight1=res;
                  this.stateSummaryLight2.on=res.state.on;
                  this.stateSummaryLight2.brightness=res.state.bri;
                  this.prevStateLight2=res.state;
                  console.log('id:' + this.stateSummaryLight2.id);
                  console.log('on: '+ this.stateSummaryLight2.on);
                }
      
                if((this.prevStateLight2.on==res.state.on)&&((this.prevStateLight2.bri!=res.state.bri))) //change to brightness but NOT on/off switch: PRINT brightness
                  {
                  this.stateLight1=res;
                  this.stateSummaryLight2.on=res.state.on;
                  this.stateSummaryLight2.brightness=res.state.bri;
                  this.prevStateLight2=res.state;
                  console.log('id:' + this.stateSummaryLight2.id);
                  console.log('brightness: ' + this.stateSummaryLight2.brightness);
                  }
                });
                }
            }

      getStateForBtn(){
  
        this.svc.getLightState(1).subscribe(res =>{
            this.stateLight1=res;
            this.pointSymbol=res.pointsymbol;
            this.s1=res.state;
            this.prevStateLight1=this.stateLight1;
            console.log(this.stateLight1);
          });
      }

      setHueState(hueSetting, isOn, brightness){
        this.svc.setHueState(hueSetting, isOn, brightness).subscribe(res => {
          this.response=res;
          // this.prevState. 
        
        });
        }

      getAllLights(){

        this.svc.getAllLights().subscribe(res => {
          this.allLights=res;
//the only way for me to get the length of that Json response          
          // console.log(Object.keys(res).length + 'is the json length')
          this.stateSummaryLight1.name=this.allLights["1"].name;
          this.stateSummaryLight1.id="1";
          this.stateSummaryLight2.id="2";
          this.stateSummaryLight2.name=this.allLights["2"].name;

        })
      }

      setLightName(){
        this.svc.setLightName('Red Lamp').subscribe(res => res);
      }

}

