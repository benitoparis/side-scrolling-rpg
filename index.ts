/// On importe les classes ici
import { DisplayController } from './src/model/class/display-controller';
import { InputController } from './src/model/class/input-controller';
import { Player } from './src/model/class/player';
import { GameService } from './src/model/class/game-service';
import { Enemy } from './src/model/class/enemy';
import { ViewPort } from './src/model/class/viewport';
import { sprite } from './src/model/interface/general-interfaces';


const canvas: any =  document.getElementById('game');

const displayController = new DisplayController(canvas);
const player = new Player(600, 600);
const inputController =  new InputController();
const viewPort = new ViewPort(0, 0, 300, 300);
export const gameService = new GameService();
let enemiesList =  [];

let mapArray = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,
    1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

let tileSetImg = document.getElementById('tileset');



let collideBrick: sprite;

// Méthode pour créer des ennemis
const initEnemies = (count: number)=>{

    // 0n crée plusieurs ennemis
    for (let i = 0; i < count; i++) {
        const x = gameService.rangeNumber(1, 600);
        const y = gameService.rangeNumber(1, 800);

        enemiesList = [...enemiesList, new Enemy(x, y)];
    } 
}


let brickList = [];


const initPlateforms = (count: number)=> {

    // On construit les plateformes aléatoirement
    for (let i = 0; i < count; i++) {
        const newBrick = { 
            x: Math.random() * 3000,
            y: Math.random() * canvas.height - 400,
            width: 300,
            height: 100,
            color: '#4AA5E4'
        };

        if (brickList.length === 0){
            brickList = [...brickList, newBrick];
        }
        
        brickList.forEach(item=> {
            if (!gameService.checkCollision(item,newBrick)){ // Si pas de collision avec une brique existante
                // On l'ajoute à la liste des briques
                brickList = [...brickList, newBrick];
            }
        })
        
        
    }
}


initEnemies(5);
initPlateforms(6);


let handleStart = (event) =>{
    console.log('event',event);

    if(+event.targetTouches[0].clientX  > 400 && +event.targetTouches[0].clientY < 300){
        inputController.up = true;
    } else if(+event.targetTouches[0].clientX > 400 && +event.targetTouches[0].clientY > 300) {
        inputController.isAttacking = true;
    } else if (+event.targetTouches[0].clientX > 0 && +event.targetTouches[0].clientX < 200){
        inputController.left = true;
        inputController.right = false;
    } else if(+event.targetTouches[0].clientX > 200 && +event.targetTouches[0].clientX < 400) {
        inputController.left = false;
        inputController.right = true;
    }
    

}

let handleEnd = (event) => {

    inputController.up = false;
    inputController.right = false;
    inputController.left = false;
    
}

canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false);
// canvas.addEventListener("touchcancel", handleCancel, false);
// canvas.addEventListener("touchleave", handleLeave, false);
// canvas.addEventListener("touchmove", handleMove, false);


// L'animation générale
function loop() {

    const savedPlayerX = player.x;
    const savedPlayerY = player.y;

    console.log('animation');

    displayController.clear();

    //displayController.drawBackground(backGroundImg, player);

    player.update(inputController);
    displayController.drawSprite(playerImg, player);

   



    const columNb = 40;
    let indexRaw = 0;
    const tileSize = 64;
    let canvasX = 0;
    let canvasY = 0;
    let cropX: number;
    let cropY: number;

    let xMin = Math.floor(viewPort.x / tileSize ); // Collone minimale
    let yMin = Math.floor(viewPort.y / tileSize ); // Rangée Minimum
    let xMax = Math.ceil((viewPort.x + viewPort.width) / tileSize); // Collone maximale
    let yMax = Math.ceil((viewPort.y + viewPort.height) / tileSize); // Rangée Minimale


    for (let i = 0; i < mapArray.length; i++){

        indexRaw = Math.floor(i /  columNb);
        canvasX = (i - indexRaw * columNb) * tileSize;
        canvasY = indexRaw * tileSize;

        switch(mapArray[i]){
            case 0:
                cropX = 320;
                cropY = 320;
                break;
            case 1:
                cropX = 64;
                cropY = 0;
                break;
        }

        displayController.drawImg(tileSetImg,cropX, cropY, canvasX, canvasY);

    }
    

    // if (inputController.isAttacking){
    //     displayController.draw('rectangle', player.damageZone);
    // }
    
    // enemiesList.forEach((enemy, index) => {
    //     displayController.draw('rectangle', enemy);

    //     if(player.damageZone && gameService.checkCollision(player.damageZone, enemy)){
    //         alert('collision entre ennemi et damagezone');
    //         enemiesList.splice(index, 1); 
    //     }
    // });
    

  
    
    //On itère sur la liste des briques
    // brickList.forEach(brick=> {
    //     displayController.draw('rectangle', brick, player);
    //     // if (gameService.checkCollision(brick, player)){ // Si collision entre la brique et le player
    //     // };
    //     if(gameService.handleCollision(player, brick)){

    //         //player.x = savedPlayerX;
    //         //collideBrick = brick;
    //         player.y = brick.y - player.height - 25;
    //         player.setJump(false);
    //     };
    // });

    window.requestAnimationFrame(loop); 
}




// fetch('/levels.json').then(data=> {
//      return data.json();
// }).then(elem => {
//     console.log('elem', elem);
// })

// function loadImage(url) {
//     return new Promise(resolve => {
//         const image = new Image();
//         image.addEventListener('load', () => {
//             resolve(image);
//         });
//         image.src = url; 
//     });
// }


// let backGroundImg = new Image();
// backGroundImg.src = 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Polarlicht_2_kmeans_16_large.png';
// backGroundImg.onload = ()=> {
//     alert('charge');
// };

// let tileSetImg = new Image();
// //tileSetImg.src = 'https://opengameart.org/sites/default/files/Preview3.jpg';
// tileSetImg.src = '/src/assets/tileset3232.png';
// tileSetImg.onload = ()=> {
//     alert('tileset charge');
//     loop();
// };
//console.log(tileSetImg)



let playerImg = new Image();
playerImg.src = 'https://www.pngkey.com/png/full/344-3448121_best-of-sprite-sheet-png-terraria-character-sprite.png';
playerImg.onload = ()=> {

};

window.addEventListener('resize', displayController.resizeCanvas, false);
window.addEventListener('orientationchange', displayController.resizeCanvas, false);

loop();
