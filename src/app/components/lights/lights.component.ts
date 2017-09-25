import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {LightService} from '../../services/light.service';
import 'rxjs/Rx';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Subscription} from 'rxjs/Rx';
import { LightData} from '../../services/lightdata.service';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})

export class LightsComponent implements OnInit {
  lightData: LightData;
  lightDataList: Array<LightData>;
  previousData: any;

  private subscription: Subscription;

  constructor( private http: Http, public svc: LightService) {}

  ngOnInit() {
    this.checkForChangesOnInterval();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getLightData() {
    if (this.lightDataList == null) {

      this.svc.getLightData().subscribe(res => {
        this.lightDataList = res;
        this.previousData = this.lightDataList;
        // Print out intial states
        this.lightDataList.forEach((ldl, ndx, ldlarray) => {
          console.log(this.lightDataList[ndx]);
        });
        
    });
    }else {
      this.svc.getLightData().subscribe(res => {
        this.lightDataList = res;
        // the below logic determines what is printed based on the changes to a given lights state
        for (let i = 0; i < this.lightDataList.length; i++ ) {
          if ( (this.previousData[i].on !== this.lightDataList[i].on) &&
              (this.previousData[i].brightness !== this.lightDataList[i].brightness)) {
                // console.log('differences occured');
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
          if ((this.previousData[i].on === this.lightDataList[i].on) &&
              (this.previousData[i].brightness !== this.lightDataList[i].brightness)) {
                console.log('id:' + this.lightDataList[i].id);
                console.log('brightness: ' + this.lightDataList[i].brightness);
                this.previousData[i] = this.lightDataList[i];
              }
        }

    });
    }
  }
  // call the http get lights on a time interval in order to notice changes.
  // if we were using push technology the interval timer would not be necessary. 
  checkForChangesOnInterval() {
    const timer = TimerObservable.create(2000, 1000);
    this.subscription = timer.subscribe(t => {
      this.getLightData();
    });
  }
}



