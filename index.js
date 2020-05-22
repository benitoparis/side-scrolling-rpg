"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
/// On importe les classes ici
var display_controller_1 = require("./src/model/class/display-controller");
var input_controller_1 = require("./src/model/class/input-controller");
var player_1 = require("./src/model/class/player");
var game_service_1 = require("./src/model/class/game-service");
var canvas = document.getElementById('game');
var displayController = new display_controller_1.DisplayController(canvas);
var player = new player_1.Player(500, 500);
var inputController = new input_controller_1.InputController();
var gameService = new game_service_1.GameService();
var brickList = [];
var _loop_1 = function (i) {
    var newBrick = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 200,
        height: 100,
        color: '#4AA5E4'
    };
    if (brickList.length === 0) {
        brickList = __spreadArrays(brickList, [newBrick]);
    }
    brickList.forEach(function (item) {
        if (!gameService.checkCollision(item, newBrick)) { // Si pas de collision avec une brique existante
            // On l'ajoute à la liste des briques
            brickList = __spreadArrays(brickList, [newBrick]);
        }
    });
};
// On construit les plateformes aléatoirement
for (var i = 0; i < 10; i++) {
    _loop_1(i);
}
var handleStart = function (event) {
    console.log('event', event);
    if (+event.targetTouches[0].clientX > 600) {
        inputController.up = true;
    }
    else if (+event.targetTouches[0].clientX > 0 && +event.targetTouches[0].clientX < 400) {
        inputController.left = true;
        inputController.right = false;
    }
    else if (+event.targetTouches[0].clientX > 400 && +event.targetTouches[0].clientX < 600) {
        inputController.left = false;
        inputController.right = true;
    }
};
var handleEnd = function (event) {
    inputController.up = false;
};
canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false);
// canvas.addEventListener("touchcancel", handleCancel, false);
// canvas.addEventListener("touchleave", handleLeave, false);
// canvas.addEventListener("touchmove", handleMove, false);
// L'animation générale
var loop = function () {
    console.log('animation');
    displayController.clear();
    player.update(inputController);
    displayController.draw('rectangle', player);
    // On itère sur la liste des briques
    brickList.forEach(function (brick) {
        displayController.draw('rectangle', brick);
        if (gameService.checkCollision(brick, player)) { // Si collision entre la brique et le player
            player.y = brick.y;
        }
        ;
    });
    window.requestAnimationFrame(loop);
};
window.requestAnimationFrame(loop);
