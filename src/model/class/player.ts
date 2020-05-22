import { InputController } from './input-controller';
import { sprite } from '../interface/general-interfaces';

export class Player {

    x: number;
    y: number;
    centerX: number;
    centerY: number;
    width = 200;
    height=  200;
    jump = false;
    speedX = 5;
    speedY = 5;
    color= '#E44C4A';
    isAttacking: boolean;
    damageZone: sprite;


    constructor(
        x: number,
        y: number,
    ){
        this.x= x;
        this.y= y;
        this.centerX = (this.x + this.width / 2);
        this.centerY = (this.y + this.height / 2);
    }

    update(input: InputController){

        console.log('input', input);

        console.log('update');

        if(input.isAttacking){ // Si le joueur attaque
            this.attack();
        }

        if (input.up && this.jump === false){
            this.speedY = 500
            this.jump = true;
            this.y -= this.speedY;
        }

        this.speedX = this.speedX * 0.90;
        this.x += this.speedX;

        if (input.left){
            this.speedX = -5;
            //this.x += this.speedX;
        }

        if (input.right){
            this.speedX = 5;
            //this.x += this.speedX;
        }
        
        this.speedY = 2;
        this.y += this.speedY;

        if (this.y > 700){ // Si le player se trouve plus bas que palier
            this.jump = false;
            this.y = 700;
        }

    }

    setPosition(x: number, y: number){
        this.x = x;
        this.y = y;
        this.centerX = (this.x + this.width / 2);
        this.centerY = (this.y + this.height / 2);
    }

    // Méthode appelée quand le bouton de saut est touché
    setJump(status : boolean){
        this.jump = status;
    }

    // Méthode appelée quand le bouton d'action est touchée
    attack() {
        console.log('attack');
        this.damageZone =  {
            x: (this.x + this.width / 2),
            y:  this.y - this.height / 2,
            width: this.width,
            height: this.height,
            color: '#DC7633'
        }
    }
}