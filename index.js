"use strict";
exports.__esModule = true;
/// On importe les classes ici
var display_controller_1 = require("./src/model/class/display-controller");
var canvas = document.getElementById('game');
var displayController = new display_controller_1.DisplayController(canvas);
displayController.draw('rectangle', 100, 100, 200, 200);
var handleStart = function (event) {
    console.log('event', event);
};
canvas.addEventListener("touchstart", handleStart, false);
// canvas.addEventListener("touchend", handleEnd, false);
// canvas.addEventListener("touchcancel", handleCancel, false);
// canvas.addEventListener("touchleave", handleLeave, false);
// canvas.addEventListener("touchmove", handleMove, false);
