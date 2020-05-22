"use strict";
exports.__esModule = true;
var DisplayController = /** @class */ (function () {
    function DisplayController(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    DisplayController.prototype.initCanvas = function () {
    };
    DisplayController.prototype.draw = function (shape, data) {
        var x = data.x, y = data.y, width = data.width, height = data.height, color = data.color;
        console.log('draw');
        this.ctx.fillStyle = color;
        switch (shape) {
            case 'rectangle':
                this.ctx.fillRect(x, y, width, height);
                break;
            default:
                this.ctx.fillRect(x, y, width, height);
                break;
        }
    };
    ;
    DisplayController.prototype.drawSprite = function () {
    };
    ;
    DisplayController.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    ;
    return DisplayController;
}());
exports.DisplayController = DisplayController;
