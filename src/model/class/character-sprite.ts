
import { DamageZone } from './damage-zone';
import { inputController, InputController } from './input-controller';

export class CharacterSprite {
    name: string;
    lifeCredit = 10;
    x= 500;
    y = 700;
    width = 64;
    height = 64;
    centerX: number;
    centerY: number;
    characterImg: Object;
    mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    speedX = 0;
    speedY = 0;
    color = '#6BE44A';
    currentDirection = 'right';

    jump = false;
    damageZone: DamageZone;
    isAttacking: boolean;
    attackTimeFrame: number;
    groundY = 704;
    currentLoopIndex = 0;
    currentCycleLoop = [];
    faceX = 64;
    faceY = 64;
    rightCycleLoop = [{faceX:0,faceY:64}, {faceX:32,faceY:64},{faceX:0,faceY:64},{faceX:64,faceY:64}];
    leftCycleLoop = [{faceX:0,faceY:32}, {faceX:32,faceY:32},{faceX:0,faceY:32},{faceX:64,faceY:32}];
    upCycleLoop = [{faceX:0,faceY:96}, {faceX:32,faceY:96},{faceX:0,faceY:96},{faceX:64,faceY:96}];
    downCycleLoop = [{faceX:0,faceY:0}, {faceX:32,faceY:0},{faceX:0,faceY:0},{faceX:64,faceY:0}];



    constructor(
        name: string,
        x: number,
        y: number,
        characterImg: Object
    ) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.characterImg = characterImg;
        this.updateDamageZone();
    }


    // Renseigne la position
    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
 
        this.setCenter();
    }


    // On recalcule les coordonnées du centre de l'entité
    setCenter(): void {
        this.centerX = (this.x + this.width / 2);
        this.centerY = (this.y + this.height / 2);
    }

    // Méthode appelée quand le bouton de saut est touché
    setJump(status : boolean): void {
        this.jump = status;
    }

    get getLifeCredit():number { return this.lifeCredit;};
    set setLifeCredit(value: number) { this.lifeCredit = value;}

    // Méthode appelée quand le personnage attaque
    attack(status : boolean): void {
        this.isAttacking = status;
        this.attackTimeFrame = 0;
    }


    // On met à jour la zone d'attaque devant le sprite
    updateDamageZone(): void {

        let x: number
        let y = this.y - this.height /2;

        if (this.currentDirection=== 'left') { // Si direction vers la gauche
            x = this.x - this.width / 2;
        } else if (this.currentDirection=== 'right'){ // Si direction vers la droite
            x = this.x + this.width / 2;
        }

        this.damageZone = new DamageZone(x, y, this.width, this.height);
    }

    setmapIndexPosition(): void {
        this.mapIndexPosition = Math.floor(this.centerX / this.width) + (80 * Math.floor(this.centerY / this.height));
    }


    


}