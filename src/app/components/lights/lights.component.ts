import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {LightService} from '../../services/light.service';
import {Light} from '../../models/light.model';
import {State} from '../../models/state.model';
import {Light1, Light2, AllLights} from '../../models/all-lights.model';


import {Pointsymbol} from '../../models/state.model';
import {RootObject} from '../../models/state.model';


import 'rxjs/Rx';
import {TimerObservable} from 'rxjs/observable/TimerObservable';


import { LightData} from '../../services/lightdata.service';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit {
  lightData: LightData;

  constructor( private http: Http, public svc: LightService) {}

  ngOnInit() {

    // this.svc.getLightStateToLTData(1);
    // console.log(this.lightData);
    // console.log(this.svc.getLightStateToLTData);
  }

}
