import { sprite } from "../interface/general-interfaces";
import { gameService, GameService } from './game-service';
import { CharacterSprite } from './character-sprite';
import { InputController } from "./input-controller";

export class Enemy extends CharacterSprite {

    autoMove: any;
    gameService: GameService;

 // Constructeur de la classe des ennemies
 constructor(name: string, x: number, y:number, characterImg: any, gameService: GameService) {

    super(name, x, y, characterImg);
    this.gameService = gameService;
    let that  = this;
    this.autoMove = setInterval(() => { that.setRandomDirection();}, 3000);
  }



  // Méthode qui va modifier les coordonnées du people.
  update(inputController: InputController): void {

    switch (this.currentDirection) {
      case 'right':
        this.speedX = 2;

        this.x = (this.x + this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;

        break;

      case 'left':
        this.speedX = 2;

        this.x = (this.x - this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.leftCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.leftCycleLoop[this.currentLoopIndex].faceY;
        break;

      // case 'north':
      //   this.speedY = 2;

      //   this.y = (this.y - this.speedY);

      //   // On détermine la positon x/y du crop du personnage
      //   this.faceX = this.upCycleLoop[this.currentLoopIndex].faceX;
      //   this.faceY = this.upCycleLoop[this.currentLoopIndex].faceY;
      //   break;

      // case 'south':

      //   this.speedY = 2;
      //   this.y = (this.y + this.speedY);
      //   // On détermine la positon x/y du crop du personnage
      //   this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
      //   this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
      //   break;

        default:
          alert('default update');
          break;
    }

    this.updateFaceCrop()

    this.setCenter();
  }

  // Réinitialise les cordonnées x /y du people
  resetCoordinates(x, y): void {
    this.x = x;
    this.y = y;
  }

  // Renvoie une direction aléatoirement
  setRandomDirection(): void {
    this.currentDirection = this.gameService.randomDirection();
  }

  // On recalcule les coordonnées du centre de l'entité
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


  // Méthode pour définir les coordonnées de la posture à croper
  updateFaceCrop(): void {

    // On incrémente le compteur de pas
    if (this.currentLoopIndex < 3){
        this.currentLoopIndex++
    } else if (this.currentLoopIndex === 3){
        this.currentLoopIndex = 0;
    }

    if (this.currentDirection=== 'left'){
        this.currentCycleLoop = this.leftCycleLoop;
    } else if (this.currentDirection=== 'right'){
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