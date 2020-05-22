import { gameService } from '../../../index';
import { sprite } from "../interface/general-interfaces";

export class Enemy {

    //name : string;
    //energy: number;
    x: number;
    y: number;
    width = 48;
    height = 48;
    centerX: number;
    centerY: number;
    //reference: string;
    //characterImg: Object;
    //mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    speedX = 2;
    speedY = 2;
    color= '#6BE44A';
    //direction: string;
    //faceX = 0;
    //faceY = 64;
    //currentLoopIndex = 0;
    //rightCycleLoop = [{faceX:0,faceY:64}, {faceX:32,faceY:64},{faceX:0,faceY:64},{faceX:64,faceY:64}];
    //leftCycleLoop = [{faceX:0,faceY:32}, {faceX:32,faceY:32},{faceX:0,faceY:32},{faceX:64,faceY:32}];
    //upCycleLoop = [{faceX:0,faceY:96}, {faceX:32,faceY:96},{faceX:0,faceY:96},{faceX:64,faceY:96}];
    //downCycleLoop = [{faceX:0,faceY:0}, {faceX:32,faceY:0},{faceX:0,faceY:0},{faceX:64,faceY:0}];



 // Constructeur de la classe des ennemies
 constructor(x: number, y:number) {

    //this.name = name;
    //this.reference = reference;
    //this.characterImg = config.getImage(this.reference);
    /* propriétés communes sprites animés */
    this.x = x; // Position X sur la map
    this.y = y; // Position Y sur la map
    this.centerX = (this.x + this.width / 2);
    this.centerY = (this.y + this.height / 2);

    // let that  = this;
    // this.autoMove = setInterval(() => { that.setRandomDirection();}, 2000);
    //this.direction = 'south';

  }



  // Méthode qui va modifier les coordonnées du people.
  update() {

    this.setCurrentLoopIndex();

    switch (this.direction) {
      case 'east':
        this.speedX = 2;

        this.x = (this.x + this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;

        break;

      case 'west':
        this.speedX = 2;

        this.x = (this.x - this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.leftCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.leftCycleLoop[this.currentLoopIndex].faceY;
        break;

      case 'north':
        this.speedY = 2;

        this.y = (this.y - this.speedY);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.upCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.upCycleLoop[this.currentLoopIndex].faceY;
        break;

      case 'south':

        this.speedY = 2;
        this.y = (this.y + this.speedY);
        // On détermine la positon x/y du crop du personnage
        this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
        break;

        default:
          alert('default update');
          break;
    }

    this.setCenter();
    this.setMapIndexPosition();
  }

  // Réinitialise les cordonnées x /y du people
  resetCoordinates(x, y){
    this.x = x;
    this.y = y;
  }

  // Renvoie une direction aléatoirement
  setRandomDirection() {

    this.direction = gameService.randomDirection();
  }

  // On recalcule le centre du people
  setCenter(){

    // On recalcule le centre du people
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
  }

  // Méthode qui renseigne l'index de la séquence de marche
  setCurrentLoopIndex(){
    if(this.frame === this.fps){
      this.frame = 0;
    } else {
      this.frame++;
    }

    // On détermine quel sprite afficher
    if (this.frame % 3 === 0){ // on décide d'incrémenter l'index toutes les 3 frames
      this.currentLoopIndex++;
    }

    // Si l'index est supérieur au nombre de position possible on le repositionne à zero
    if (this.currentLoopIndex >= this.rightCycleLoop.length) {
      this.currentLoopIndex = 0;
    }
  }

  // Méthode pour réinitialiser la position du people dans la map
  setPosition(destination) {

    this.x = destination.x;
    this.y = destination.y;
   //this.currentWorldPosition =  new WorldPosition(destination.worldId,destination.mapSheetId );
    this.setCenter();
    this.setMapIndexPosition();
  }

  // Méthode pour setter l'index du figuant sur la map
  setMapIndexPosition(){

    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
  }

}