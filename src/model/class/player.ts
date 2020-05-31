import { InputController } from './input-controller';
import { sprite } from '../interface/general-interfaces';
import { DamageZone } from './damage-zone';

export class Player {

    x: number;
    y: number;
    centerX: number;
    centerY: number;
    faceX= 0;
    faceY= 64;
    width=64;
    height=64;
    jump = false;
    speedX=5;
    speedY=5;
    color= '#E44C4A';
    isAttacking: boolean;
    damageZone: DamageZone;
    groundY = 704;
    currentLoopIndex = 0;
    rightCycleLoop = [{faceX:0,faceY:64}, {faceX:32,faceY:64},{faceX:0,faceY:64},{faceX:64,faceY:64}];
    leftCycleLoop = [{faceX:0,faceY:32}, {faceX:32,faceY:32},{faceX:0,faceY:32},{faceX:64,faceY:32}];
    upCycleLoop = [{faceX:0,faceY:96}, {faceX:32,faceY:96},{faceX:0,faceY:96},{faceX:64,faceY:96}];
    downCycleLoop = [{faceX:0,faceY:0}, {faceX:32,faceY:0},{faceX:0,faceY:0},{faceX:64,faceY:0}];
    
    constructor(
        x: number,
        y: number,
    ){
        this.x= x;
        this.y= y;
        this.centerX = (this.x + this.width / 2);
        this.centerY = (this.y + this.height / 2);
        this.damageZone = 
    }

    update(input: InputController){


        if(input.isAttacking){ // Si le joueur attaque
            this.attack();
        }

        if (input.up && this.jump === false){
            this.speedY = 230;
            this.jump = true;
            this.y -= this.speedY;
        }

        this.speedX = this.speedX * 0.90;
        this.x += this.speedX;

        if (input.left){
            this.speedX = -1;
            //this.x += this.speedX;
        }

        if (input.right){
            this.speedX = 1;
            //this.x += this.speedX;
        }
        
        this.speedY = 1;
        this.y += this.speedY;

        
        if ((this.y + this.height) > this.groundY){
             this.y = this.groundY - 64;
             this.jump = false;
        }

        // if (this.y > 700){ // Si le player se trouve plus bas que palier
        //     this.jump = false;
        //     this.y = 700;
        // }

        if (this.x < 300) { // On empeche le joueur d'aller au bord gauche de la map courante
            this.x = this.x + 10;
        } else if(this.x > 4000){ // On empeche le joueur d'aller au bord droit de la map courante
            this.x = this.x - 10; 
        }

      this.updateFaceCrop(input);
    }

    setPosition(x: number, y: number){
        this.x = x;
        this.y = y;
        this.centerX = (this.x + this.width / 2);
        this.centerY = (this.y + this.height / 2);
    }

    // Méthode appelée quand le bouton de saut est touché
    setJump(status : boolean): void {
        this.jump = status;
    }

    // Méthode appelée quand le bouton d'action est touchée
    attack(status : boolean): void {
        this.isAttacking = status;
    }

    // Méthode pour définir les coordonnées de la posture à croper
    updateFaceCrop(input: InputController): void {

        // On incrémente le compteur de pas
        if (this.currentLoopIndex < 3){
            this.currentLoopIndex++
        } else if(this.currentLoopIndex === 3){
            this.currentLoopIndex = 0;
        }
        
        let cycle: any[];

        if (input.left){
            cycle = this.leftCycleLoop;
        } else if (input.right){
            cycle = this.rightCycleLoop;
        } else if(input.up){
            cycle = this.upCycleLoop;
        } else if (input.up){
            cycle = this.upCycleLoop;
        }
        
        this.faceX = cycle[this.currentLoopIndex].faceX;
        this.faceY = cycle[this.currentLoopIndex].faceY;
    }

    // On met à jour la zone d'attaque devant le joueur
    updateDamageZone(input: InputController): void {

        let x: number
        let y = this.y - this.height /2;

        if (input.left) { // Si direction vers la gauche
            x = this.x - this.width / 2;
        } else if (input.right){ // Si direction vers la droite
            x = this.x + this.width / 2;
        }

        this.damageZone = new DamageZone(x, y, this.width, this.height);
    }
}