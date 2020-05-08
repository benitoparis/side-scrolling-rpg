import { InputController } from "./input-controller";


export class Player {

    x: number;
    y: number;
    centerX: number;
    centerY: number;
    width = 200;
    height=  200;
    jump = false;

    constructor(
        x: number,
        y: number,
    ){
        this.x= x;
        this.y= y;
    }

    update(input: InputController){

        console.log('update');

        if(input.up && !this.jump){
            this.y -= 200;
            this.jump = true;
        }

        if(input.left){
            this.x -= 0.5;
        }

        if(input.right){
            this.x += 0.5;
        }

        this.y += 1;

        if(this.y > 700){
            this.y = 700;
            this.jump = false;
        }

    }

    setPosition(x: number, y: number){
        this.x= x;
        this.y= y;
    }
}