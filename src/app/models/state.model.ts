export interface State {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    xy: number[];
    ct: number;
    alert: string;
    effect: string;
    colormode: string;
    reachable: boolean;
}

export interface Pointsymbol {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
}

export interface RootObject {
    state: State;
    type: string;
    name: string;
    modelid: string;
    swversion: string;
    pointsymbol: Pointsymbol;
}

    

    
    