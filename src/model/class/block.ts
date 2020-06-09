import { gameService } from '../../../index';
import { sprite } from "../interface/general-interfaces";
import { GameService } from './game-service';
import { Player } from './player';

export class Block {

    //name : string;
    //energy: number;
    x: number;
    y: number;
    width = 64;
    height = 64;
    centerX: number;
    centerY: number;
    //reference: string;
    img: Object;
    //mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    speedX = 2;
    speedY = 2;
    faceX = 0;
    faceY = 64;

 // Constructeur de la classe des ennemies
 constructor(x: number, y:number, gameService: GameService) {

    //this.name = name;
    //this.reference = reference;
    //this.characterImg = config.getImage(this.reference);
    /* propriétés communes sprites animés */
    this.x = x; // Position X sur la map
    this.y = y; // Position Y sur la map
    this.centerX = (this.x + this.width / 2);
    this.centerY = (this.y + this.height / 2);
  }



  // Méthode qui va modifier les coordonnées du people.
  update(player: Player) {

    if (this.x < player.x && this.x + this.width > this.x) { // Si le joueur est en dessous du block
        // Le block tombe
        this.y = this.y + this.speedX;
    }

    //this.updateFaceCrop()

    //this.setCenter();
  }

  // Réinitialise les cordonnées x /y du people
  resetCoordinates(x, y): void {
    this.x = x;
    this.y = y;
  }

  // Renvoie une direction aléatoirement
  setRandomDirection(): void {
    
    //this.currentDirection = this.gameService.randomDirection();
    //console.log('setRandomDirection this.currentDirection',this.currentDirection);
  }

  // On recalcule le centre du people
  setCenter(): void {

    // On recalcule le centre du people
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
  }


  // Méthode pour réinitialiser la position du people dans la map
  setPosition(destination) {

    this.x = destination.x;
    this.y = destination.y;
   //this.currentWorldPosition =  new WorldPosition(destination.worldId,destination.mapSheetId );
    this.setCenter();
    //this.setMapIndexPosition();
  }

  // Méthode pour setter l'index du figuant sur la map
  setMapIndexPosition(){

    //this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
  }

  // Méthode pour définir les coordonnées de la posture à croper
//   updateFaceCrop(): void {

//     // On incrémente le compteur de pas
//     if (this.currentLoopIndex < 3){
//         this.currentLoopIndex++
//     } else if (this.currentLoopIndex === 3){
//         this.currentLoopIndex = 0;
//     }

//     if (this.currentDirection=== 'left'){
//         this.currentCycleLoop = this.leftCycleLoop;
//     } else if (this.currentDirection=== 'right'){
//         this.currentCycleLoop = this.rightCycleLoop;
//     }

//     if (this.currentDirection=== 'right' && this.speedX < 0.1 ){ // A l'arret vers la droite
//         this.faceX = 0;
//         this.faceY = 64;
//     } else if (this.currentDirection=== 'left' && this.speedX > -0.1) { // A l'arret la gauche
//         this.faceX = 0;
//         this.faceY = 32;
//     } else if(this.currentDirection=== 'standing' && this.speedX < 0.1) {
//         this.faceX = 0;
//         this.faceY = 64;
//     } else { // Il avance
//         this.faceX = this.currentCycleLoop[this.currentLoopIndex].faceX;
//         this.faceY = this.currentCycleLoop[this.currentLoopIndex].faceY;
//     }
//   }

}