import { sprite } from "../interface/general-interfaces";

export class DamageZone implements sprite {

    x: number;
    y: number;
    width: number;
    height: number;
    color = '#DC33B8';

    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

}