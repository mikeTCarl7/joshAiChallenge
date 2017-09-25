export class LightData {

    name: string;
    id: string;
    on: boolean;
    brightness: number;



    setLightData(jsonObject: any, id: any) {

                const vo = new LightData();
                vo.name = jsonObject.name;
                vo.id = id;
                vo.on = jsonObject.state.on;
                vo.brightness = this.calculatePercent(jsonObject.state.bri);
                return vo;
            }

    calculatePercent(value: number) {
        return (value / 254) * 100;
    }


}
