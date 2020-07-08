import { sprite } from "../interface/general-interfaces";
import { GameService, gameService } from './game-service';

export class MovingPlateform {

    x: number;
    y: number;
    anchorX: number;
    anchorY: number;
    width = 64;
    height = 64;
    centerX: number;
    centerY: number;
    img: Object;
    speedX = 1;
    speedY = 0;
    faceX = 64;
    faceY = 128;
    gameService: GameService;

 // Constructeur de la classe des plateformes
 constructor(anchorX: number, anchorY: number, gameService: GameService) {

    this.anchorX = anchorX;
    this.anchorY = anchorY;
    this.x = anchorX;
    this.y = anchorY;
    this.gameService = gameService;
    this.setCenter();
  }



  // Méthode qui va modifier les coordonnées de la plateforme
  update() {

    const distance = this.gameService.getDistance(this.x, this.anchorX);

    console.log('distance', distance);
  
    if (distance >= 50 && this.x > this.anchorY) {
        this.x = this.x - this.speedX;
    } else if (distance >= 50 && this.x < this.anchorX ) {
        this.x = this.x + this.speedX;
    } else {
        this.x = this.x + this.speedX;
    }
    
  }

  // Réinitialise les cordonnées x /y de la plateforme
  setCoordinates(x, y): void {
    this.x = x;
    this.y = y;
    this.setCenter();
  }


  // On recalcule le centre
  setCenter(): void {
    this.centerX = (this.x + this.width / 2);
    this.centerY = (this.y + this.height / 2);
  }
  
}