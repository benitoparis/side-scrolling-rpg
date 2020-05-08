"use strict";
exports.__esModule = true;
var DisplayController = /** @class */ (function () {
    function DisplayController(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    DisplayController.prototype.initCanvas = function () {
    };
    DisplayController.prototype.draw = function (shape, x, y, width, height) {
        console.log('draw');
        switch (shape) {
            case 'rectangle':
                this.ctx.rect(x, y, width, height);
                break;
            default:
                this.ctx.rect(x, y, width, height);
        }
    };
    ;
    DisplayController.prototype.drawSprite = function () {
    };
    ;
    DisplayController.prototype.clear = function () {
    };
    ;
    return DisplayController;
}());
exports.DisplayController = DisplayController;
