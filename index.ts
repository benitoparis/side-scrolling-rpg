/// On importe les classes ici
import { DisplayController } from './src/model/class/display-controller';
import { InputController } from './src/model/class/input-controller';
import { Player } from './src/model/class/player';
import { GameService } from './src/model/class/game-service';
import { Enemy } from './src/model/class/enemy';
import { ViewPort } from './src/model/class/viewport';
import { sprite } from './src/model/interface/general-interfaces';
import { Block } from './src/model/class/block';
import { Level } from './src/model/class/level';


const canvas: any =  document.getElementById('game');

const displayController = new DisplayController(canvas);
const player = new Player(400, 600);
const inputController =  new InputController();
const viewPort = new ViewPort(0, 0, 800, 600);
export const gameService = new GameService();

let brickList = [];
let enemiesList =  [];
let blockList = [];

let levelJson = {
    nbCols: 40,
    tileSize: 64,
    levelTileCollection: [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,4,5,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
    ]
}


let tileSetImg = document.getElementById('tileset');
let playerImg = document.getElementById('heros6');
let enemyImg = document.getElementById('personnage-important2');
export let level =  new Level(levelJson);

// Méthode pour créer des ennemis
const initEnemies = (count: number)=>{

    // 0n crée plusieurs ennemis
    for (let i = 0; i < count; i++) {
        const x = gameService.rangeNumber(400, 1500);
        const y = 640;

        enemiesList = [...enemiesList, new Enemy(x, y, gameService)];
    }
}

// Méthode pour créer des ennemis
const initBlocks = (count: number)=> {

    // 0n crée plusieurs ennemis
    for (let i = 0; i < count; i++) {
        const x = gameService.rangeNumber(400, 1500);
        const y = gameService.rangeNumber(2, 100);

        console.log({x, y});

        blockList = [...blockList, new Block(x, y, gameService)];
    } 
}






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
        
        brickList.forEach(item => {
            if (!gameService.checkCollision(item,newBrick)){ // Si pas de collision avec une brique existante
                // On l'ajoute à la liste des briques
                brickList = [...brickList, newBrick];
            }
        });  
    }
}




const initAll = ()=> {
    initEnemies(5);
    initPlateforms(6);
    initBlocks(5);
};

console.log('blockList', blockList);


let handleStart = (event) =>{

    if(+event.targetTouches[0].clientX  > 400 && +event.targetTouches[0].clientY < 300){
        inputController.up = true;
    } else if(+event.targetTouches[0].clientX > 400 && +event.targetTouches[0].clientY > 300) {
        inputController.attack = true;
    } else if (+event.targetTouches[0].clientX > 0 && +event.targetTouches[0].clientX < 200){
        inputController.left = true;
    } else if(+event.targetTouches[0].clientX > 200 && +event.targetTouches[0].clientX < 400) {
        inputController.right = true;
    }
    

}

let handleEnd = (event) => {

    inputController.up = false;
    inputController.right = false;
    inputController.left = false;
    inputController.attack = false;
    
}

canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false);
// canvas.addEventListener("touchcancel", handleCancel, false);
// canvas.addEventListener("touchleave", handleLeave, false);
// canvas.addEventListener("touchmove", handleMove, false);


// On crée tous les sprites et les éléments
initAll();


// L'animation générale
function loop() {

    displayController.clear();

    //displayController.drawBackground(backGroundImg, player);


    const columNb = 80;
    let indexRaw = 0;
    const tileSize = 64;
    let canvasX = 0;
    let canvasY = 0;
    let tileX = 0;
    let tileY = 0;
    let cropX: number;
    let cropY: number;

    let xMin = Math.floor(viewPort.x / tileSize ); // Colone minimale
    let yMin = Math.floor(viewPort.y / tileSize ); // Rangée Minimum
    let xMax = Math.ceil((viewPort.x + viewPort.width) / tileSize); // Colone maximale
    let yMax = Math.ceil((viewPort.y + viewPort.height) / tileSize); // Rangée Minimale

 
    for (let x = xMin; x < xMax; x++){

        for (let y = yMin; y < yMax; y++){

            let value = mapArray[y * columNb + x];
            canvasX = x * tileSize - viewPort.x;
            canvasY = y * tileSize - viewPort.y;
    
            switch(value){
                case 0:
                    cropX = 320;
                    cropY = 320;
                    break;
                case 1:
                    cropX = 0;
                    cropY = 0;
                    break;
                case 2:
                    cropX = 256;
                    cropY = 0;
                    break;
                case 3:
                    cropX = 384;
                    cropY = 0;
                    break;
                case 4:
                    cropX = 320;
                    cropY = 256;
                    break;
                case 5:
                    cropX = 384;
                    cropY = 256;
                    break;
            }
            if(value !== 0){
                displayController.drawImg(tileSetImg,cropX, cropY, canvasX, canvasY);
            }
            
        }

    }

    // On affiche les blocks
    blockList.forEach(block => {
        block.update(player);
        displayController.drawSprite(tileSetImg, viewPort, block);

        if (!block.haveTouchedPlayer && gameService.checkCollision(player, block)){ // Si le block n'a pas encore percuté le joueur et qu'il y a collision
            block.haveTouchedPlayer = true;
            // On retire un point de crédit au joueur.
            player.setLifeCredit = player.getLifeCredit - 1;
        }
    });

    player.update(inputController);
    displayController.drawSprite(playerImg, viewPort, player);
    viewPort.defineViewPoint(player.x - ((800 / 2) - player.width / 2), (player.y - (600/2) + 20), 800, 600);

    if (player.isAttacking){ // Si le player attaque on affiche sa zone d'attaque représentée par un carré
        displayController.draw('rectangle',viewPort,player.damageZone);
    }


    for (let i = 0; i < mapArray.length; i++){
        
        indexRaw = Math.floor(i /  columNb);
        tileX = (i - indexRaw * columNb) * tileSize;
        tileY = indexRaw * tileSize;

        // switch(mapArray[i]){
        //     case 0:
        //         cropX = 320;
        //         cropY = 320;
        //         break;
        //     case 1:
        //         cropX = 64;
        //         cropY = 0;
        //         break;
        // }

        

        if(mapArray[i] === 3){
            if(gameService.handleCollision(player, {x: tileX, y: tileY, width: 64, height: 64 , color: '' })){
               
                player.setJump(false);
                
                player.groundY = tileY;
                player.update(inputController);
                const txt = `player.x : ${player.x}, player.y : ${player.y }`;
                displayController.drawTxt(txt, 10, 50);

                const txt2 = `tileX : ${tileX}, tileY : ${tileY}`;
                displayController.drawTxt(txt2, 10, 100);

                viewPort.defineViewPoint(player.x - ((800 / 2) - player.width / 2), (player.y - (600/2) + 20), 800, 600);

                
            } else {
                
                player.groundY = 704;
                player.update(inputController);
                const texteCoordonneesX= `player.x : ${player.x}`;
                displayController.drawTxt(texteCoordonneesX, 10, 120);
               
                const texteCoordonneesY= `player.y : ${player.y}`;
                displayController.drawTxt(texteCoordonneesY, 10, 150);

                const texteCreditsDispo= `Credits : ${player.getLifeCredit}`;
                displayController.drawTxt(texteCreditsDispo, 10, 180);

                viewPort.defineViewPoint(player.x - ((800 / 2) - player.width / 2), (player.y - (600/2) + 20), 800, 600);

            }
            
        }
        

    }
    
    
    enemiesList.forEach((enemy, index) => {
        enemy.update();
        displayController.drawSprite(enemyImg, viewPort, enemy);


        if (player.isAttacking && gameService.checkCollision(player.damageZone, enemy)){
            alert('collision entre ennemi et damagezone');
            enemiesList.splice(index, 1); 
        }
    });

 
    
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



// On ajoute les évènement pour resizer le canvas
window.addEventListener('resize', displayController.resizeCanvas, false);
window.addEventListener('orientationchange', displayController.resizeCanvas, false);


loop();



