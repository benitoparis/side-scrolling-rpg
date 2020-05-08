
export interface sprite {
    x: number,
    y: number,
    width: number,
    height: number
}


export class DisplayController {
    
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(
         canvas: any
    ){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    initCanvas(){
     
    }

    draw(shape: string, data: sprite): void {

        const {x, y, width, height} = data;

        console.log('draw');
        this.ctx.fillStyle = "#FF0000";

        switch(shape){

            case 'rectangle':
                this.ctx.fillRect(x, y, width, height);
                break;
                default:
                this.ctx.fillRect(x, y, width, height);
                break;
        }
        
    };

    drawSprite(){

    };

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

}