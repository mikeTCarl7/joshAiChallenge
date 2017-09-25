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
  previousData:any;

  private subscription: Subscription;

  constructor( private http: Http, public svc: LightService) {}

  ngOnInit() {

    

    this.checkForChangesOnInterval();
    // this.getLightData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getLightData() {
    if (this.lightDataList == null) {

      this.svc.getLightData2().subscribe(res => {
        this.lightDataList = res;
        this.previousData = this.lightDataList;
        // console.log(this.lightDataList);
    });
    }else {
      this.svc.getLightData2().subscribe(res => {
        this.lightDataList = res;

        for(let i = 0; i < this.lightDataList.length; i++ ) {
          if ( (this.previousData[i].on !== this.lightDataList[i].on) &&
              (this.previousData[i].brightness !== this.lightDataList[i].brightness)) {
                console.log('differences occured');
                console.log('id:' + this.lightDataList[i].id + '\n' +
                'on: ' + this.lightDataList[i].on + '\n' + 'brightness: '
                + this.lightDataList[i].brightness);
                this.previousData[i] = this.lightDataList[i];
          }
          if ( (this.previousData[i].on !== this.lightDataList[i].on) &&
            (this.previousData[i].brightness === this.lightDataList[i].brightness)) {

              console.log('id:' + this.lightDataList[i].id);
              console.log('on: ' + this.lightDataList[i].on);
              this.previousData[i] = this.lightDataList[i];

            }
            if ( (this.previousData[i].on === this.lightDataList[i].on) &&
              (this.previousData[i].brightness !== this.lightDataList[i].brightness)) {
                console.log('id:' + this.lightDataList[i].id);
                console.log('brightness: ' + this.lightDataList[i].brightness);
                this.previousData[i] = this.lightDataList[i];
              }
        }

    });
    }


  }



  checkForChangesOnInterval() {
    const timer = TimerObservable.create(2000, 1000);
    this.subscription = timer.subscribe(t => {
      // this.tick = t;
      this.getLightData();
    });
  }


}



