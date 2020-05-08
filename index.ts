/// On importe les classes ici
import { DisplayController, sprite } from './src/model/class/display-controller';
import { InputController } from './src/model/class/input-controller';
import { Player } from './src/model/class/player';


const canvas: any =  document.getElementById('game');

const displayController = new DisplayController(canvas);
const player = new Player(500, 500);
const inputController =  new InputController();

displayController.draw('rectangle', player);


let handleStart = (event) =>{
    console.log('event',event);

    if(+event.targetTouches[0].clientX > 600){
        inputController.up = true;
    }

}

let handleEnd = (event) => {
    alert('handleEnd');

    inputController.up = false;
    

}

canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false);
// canvas.addEventListener("touchcancel", handleCancel, false);
// canvas.addEventListener("touchleave", handleLeave, false);
// canvas.addEventListener("touchmove", handleMove, false);


const loop = ()=> {
console.log('animation');

displayController.clear();
player.update(inputController);
displayController.draw('rectangle', player);
window.requestAnimationFrame(loop); 
}

window.requestAnimationFrame(loop); 