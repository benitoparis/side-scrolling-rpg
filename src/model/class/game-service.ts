import { sprite } from '../interface/general-interfaces';
import { Player } from './player';

export class GameService {

    constructor(){
    }

    // On vérifie s'il y a collusion entre deux sprites
    checkCollision(a: sprite, b: sprite): boolean {
        // On vérifie si A et B sont sur la même mapsheet et s'il y a collision
        if (
        (
            b.x > a.x + a.width ||
            b.x < a.x - b.width ||
            b.y > a.y + a.height ||
            b.y < a.y - b.height
        )) { // Pas de collision
            return false;
        } else { // collision
            return true;
        }
    }

    // On réagit à la collision
    handleCollision(a: sprite, b: sprite){
 
        if (
            (a.y + a.height < b.y + 20 && a.y + a.height > b.y)
            && ((a.x + a.width > b.x && a.x + a.width < b.x + b.width) 
            || (a.x < b.x + b.width && a.x > b.x))

        ){
           return true;
        } else {
            return false;
        }

    }

    // Méthode qui retourne un chiffre compris entre A et B
    rangeNumber (a,b){
        return Math.floor((Math.random() * b)) + a;
    };

    // Calcule la distance entre a et b
    getDistance (a: number,b: number): number {
        return Math.abs(a - b);
    }

    // Méthode qui renvoie une direction aléatoire
    randomDirection(){
        const randomNumber = this.rangeNumber(1,2);
        console.log('randomNumber', randomNumber);
        let direction = '';

        switch(randomNumber){
            case 1:
                direction = 'right';
                break;
            case 2:
                direction = 'left';
                break;
            default:
                direction = 'right';
                break;
        }
        return direction;
    }


}

export const gameService = new GameService();