import { inputController, InputController } from './input-controller';
import { sprite } from '../interface/general-interfaces';
import { DamageZone } from './damage-zone';
import { map } from '../../../index';
import { CharacterSprite } from './character-sprite';

export class Player extends CharacterSprite {

    constructor(
        name: string,
        x: number,
        y: number,
        characterImg: any

    ){
        console.log('constructeur player');
        super(name, x,y, characterImg);
    }

    update(input: InputController): void {

        if (input.attack){ // Si le joueur attaque
            this.attack(true);
        } else if (this.isAttacking && this.attackTimeFrame < 60){
            this.attackTimeFrame++;
        } else {
            this.attack(false);
        }

        if (input.up && this.jump === false){
            this.speedY = 230;
            this.jump = true;
            this.y -= this.speedY;
        }

        if (input.left){
            this.speedX = -1;
            this.currentDirection= 'left';
        }

        if (input.right){
            this.speedX = 1;
            this.currentDirection= 'right';
        }
        
        this.speedY = 1;
        this.y += this.speedY;

        this.speedX = this.speedX * 0.90;
        this.x += this.speedX;

        
        if ((this.y + this.height) > this.groundY){ // Si le player se trouve plus bas que palier
             this.y = this.groundY - 64;
             this.jump = false;
        }

        if (this.x < 300) { // On empeche le joueur d'aller au bord gauche de la map courante
            this.x = this.x + 10;
        } else if (this.x > map.getMapWidth - 300 ){ // On empeche le joueur d'aller au bord droit de la map courante
            this.x = this.x - 10; 
        }

        this.updateFaceCrop(input);
        this.updateDamageZone();
    }


        // Méthode pour définir les coordonnées de la posture à croper
        updateFaceCrop(input: InputController): void {

            // On incrémente le compteur de pas
            if (this.currentLoopIndex < 3){
                this.currentLoopIndex++
            } else if (this.currentLoopIndex === 3){
                this.currentLoopIndex = 0;
            }
    
            if (input.left){
                this.currentCycleLoop = this.leftCycleLoop;
            } else if (input.right){
                this.currentCycleLoop = this.rightCycleLoop;
            }
    
            if (this.currentDirection=== 'right' && this.speedX < 0.1 ){ // A l'arret vers la droite
                this.faceX = 0;
                this.faceY = 64;
            } else if (this.currentDirection=== 'left' && this.speedX > -0.1) { // A l'arret la gauche
                this.faceX = 0;
                this.faceY = 32;
            } else if(this.currentDirection=== 'standing' && this.speedX < 0.1) {
                this.faceX = 0;
                this.faceY = 64;
            } else { // Il avance
                this.faceX = this.currentCycleLoop[this.currentLoopIndex].faceX;
                this.faceY = this.currentCycleLoop[this.currentLoopIndex].faceY;
            }
        }

}