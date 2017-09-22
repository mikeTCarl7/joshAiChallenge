import { Component, OnInit } from '@angular/core';
// import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {LightService} from '../../services/light.service'
// import {Light} from '../models/light.model'
// import {State} from '../models/state.model'
// import {Pointsymbol} from '../models/state.model'
// import {RootObject} from '../models/state.model'

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


private tick:number
private subscription:Subscription;
// prevState:any;
// response:any;
// lights:Array<Light>
// light:Light
// state:RootObject
// s1:State
// pointSymbol:Pointsymbol


  constructor( private http: Http, public svc:LightService) {
    this.stateSummary.name='Red Lamp';
   }

  ngOnInit() {
  }

}
