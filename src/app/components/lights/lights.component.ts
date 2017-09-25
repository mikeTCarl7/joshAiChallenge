import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {LightService} from '../../services/light.service';
import {Light1, Light2, AllLights} from '../../models/all-lights.model';
// import { LightStatesComponent } from '../light-states/light-states.component';

import {Pointsymbol} from '../../models/state.model';
import {RootObject} from '../../models/state.model';


import 'rxjs/Rx';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Subscription} from 'rxjs/Rx';



import { LightData} from '../../services/lightdata.service';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
  // entryComponents: [LightStatesComponent]
})
export class LightsComponent implements OnInit {
  lightData: LightData;
  lightDataList: Array<LightData>;

  private subscription: Subscription;

  constructor( private http: Http, public svc: LightService) {}

  ngOnInit() {

    debugger

    this.checkForChangesOnInterval();
    // this.getLightData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getLightData() {
    this.svc.getLightData2().subscribe(res => {
      console.log(res);
      // res.json();
      this.lightDataList = res;
      // console.log(this.lightDataList);
  });
  }

  checkForChangesOnInterval() {
    const timer = TimerObservable.create(2000, 1000);
    this.subscription = timer.subscribe(t => {

      // this.tick = t;
      this.getLightData();
    });

  }

}
