import { Injectable } from '@angular/core';
// import {LightService} from './light.service';

import {Observable} from 'rxjs/Observable';

// @Injectable()
export class LightData {

    name: string;
    id: string;
    on: boolean;
    brightness: number;

    // setLightData(jsonObject: any, id: any) {

    //     const vo = new LightData();
    //     // vo.name = jsonObject.state.name;
    //     vo.id = id;
    //     vo.on = jsonObject.state.on;
    //     vo.brightness = jsonObject.state.bri;
    //     // console.log(vo);
    //     return vo;


    // }

    setLightData(jsonObject: any, id: any) {

                const vo = new LightData();
                vo.name = jsonObject.name;
                vo.id = id;
                vo.on = jsonObject.state.on;
                vo.brightness = jsonObject.state.bri;
                return vo;
            }

}
