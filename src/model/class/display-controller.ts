import { sprite } from '../interface/general-interfaces';


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

    initCanvas(){
     
    }

    draw(shape: string, data: sprite, player: sprite): void {

        const {x, y, width, height, color } = data;

        console.log('draw');
        this.ctx.fillStyle = color;

        switch(shape){

            case 'rectangle':
                this.ctx.fillRect(
                    x - player.x,
                    y,
                    width,
                    height
                );
                break;
                default:
                this.ctx.fillRect(x, y, width, height);
                break;
        }
        
    };

    drawSprite(charaterImg: any, player: sprite){
        this.ctx.drawImage(
            charaterImg,
            //this.faceX , // Position X de la partie à croper
            //this.faceY , // Position Y de la partie à croper
            30,
            30,
            
            
            150 , // Largeur de la partie à croper
            150 , // Hauteur de la partie à corper
            (this.canvas.width / 2) - player.width / 2, // on l'affiche toujours au milieu du canvas // Position x de l'image à croper sur le canvas
            (this.canvas.height - 192 - player.height), // on l'affiche toujours au milieu du canvas // Position y de l'image à croper sur le canvas
            //this.width, // Largeur de la partie cropée
            //this.height // Hauteur de la partie cropée
            64,
            64
            );
    };

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    drawBackground(backgroundImg: any, player: sprite){

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

        console.log('event', event);
        this.canvas.width = 800 //window.innerWidth;
        this.canvas.height = 600 // window.innerHeight;
    }
      
}