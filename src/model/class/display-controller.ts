import { sprite } from '../interface/general-interfaces';
import { Player } from './player';
import { Enemy } from './enemy';
import { ViewPort } from './viewport';
import { Block } from './block';
import { Printable, TxtFormat} from '../interface/general-interfaces';


export class DisplayController {
    
    private canvas: any;
    private ctx: CanvasRenderingContext2D;

    constructor(
         canvas: any
    ){
        this.canvas = canvas;
        this.canvas.width = 800 //window.innerWidth;
        this.canvas.height = 600 //window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
    }

    draw(shape: string, viewPort: ViewPort, sprite: sprite): void {

        const {x, y, width, height, color } = sprite;
        this.ctx.fillStyle = color;

        switch(shape){

            case 'rectangle':
                this.ctx.fillRect(
                    x - viewPort.x,
                    y - viewPort.y,
                    width,
                    height
                );
                break;
                default:
                this.ctx.fillRect(x, y, width, height);
                break;
        }
        
    };

    drawSprite(characterImg: any, viewPort: ViewPort, sprite: sprite){

        // On va déterminer les coordonnées Y/Y du sprite à affichernsur le canvas
        let canvasX: number;
        let canvasY: number;

        if (sprite instanceof Player){
            canvasX = (this.canvas.width / 2) - sprite.width / 2;
            canvasY = (this.canvas.height - 256 - sprite.height);
        }
        if (sprite instanceof Enemy || sprite instanceof Block){
            canvasX = sprite.x - viewPort.x;
            canvasY = sprite.y - viewPort.y;
        }

        this.ctx.drawImage(
            characterImg,
            sprite.faceX, // Position X de la partie à croper
            sprite.faceY, // Position Y de la partie à croper
            32 , // Largeur de la partie à croper
            32 , // Hauteur de la partie à corper
            canvasX, // on l'affiche toujours au milieu du canvas // Position x de l'image à croper sur le canvas
            canvasY, // on l'affiche toujours au milieu du canvas // Position y de l'image à croper sur le canvas
            sprite.width, // Largeur de la partie cropée
            sprite.height // Hauteur de la partie cropée
        );

    };

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    drawBackground(backgroundImg: any, player: sprite): void {

          this.ctx.drawImage(
            backgroundImg, // Objet image représentant le background
            player.x - this.canvas.width / 2, // Position X de la partie à croper
            //player.y - 288.5, // Position Y de la partie à croper
            0, // Position Y de la partie à croper

            this.canvas.width , // Largeur de la partie à croper
            this.canvas.height , // Hauteur de la partie à corper
            0, // Position X sur le canvas de l'image cropée
            0,  // Position Y sur le canvas de l'image cropée
            this.canvas.width , // Largeur de l'image cropée sur le canvas
            this.canvas.height // Hauteur de l'image cropée sur le canvas
          );
    };

    drawImg(img: any, cropX: number, cropY: number, canvasX: number, canvasY: number ): void {

        this.ctx.drawImage(
            img, // Objet image représentant le background
            cropX, // Position X de la partie à croper
            //player.y - 288.5, // Position Y de la partie à croper
            cropY, // Position Y de la partie à croper
            64 , // Largeur de la partie à croper
            64 , // Hauteur de la partie à corper
            canvasX, // Position X sur le canvas de l'image cropée
            canvasY,  // Position Y sur le canvas de l'image cropée
            64 , // Largeur de l'image cropée sur le canvas
            64 // Hauteur de l'image cropée sur le canvas
          );
    }

    resizeCanvas(event): void {
        this.canvas.width = 800 //window.innerWidth;
        this.canvas.height = 600 // window.innerHeight;
    }
   
    drawTxt(list: TxtFormat[]): void {

        list.forEach(elem=> {
            this.ctx.fillStyle = elem.color;
            this.ctx.font = elem.font;
            this.ctx.fillText(elem.txt, elem.canvasX, elem.canvasY);
        });
    }

    // Méthode pour dessiner un fond de couleur
    dawBgColor(color: string): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Méthode pour afficher du texte sur fond noir
    drawStoryScreen(printDatas: Printable): void {
        this.dawBgColor(printDatas.bgColor);
        this.drawTxt(printDatas.textList);
    }
}