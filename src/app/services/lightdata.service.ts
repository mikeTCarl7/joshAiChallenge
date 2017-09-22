import { Injectable } from '@angular/core';
import {LightService} from './light.service';

@Injectable()
export class LightData {

    name: string;
    id: string;
    on: boolean;
    brightness: number;

    setLightData(jsonObject: any) {

        const vo = new LightData();
        vo.name = jsonObject.state.name;
        // vo.id=jsonObject.state.id;
        vo.on = jsonObject.state.on;
        vo.brightness = jsonObject.state.bri;
        console.log(vo);

    }

}
