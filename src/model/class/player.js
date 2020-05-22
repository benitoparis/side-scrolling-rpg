"use strict";
exports.__esModule = true;
var Player = /** @class */ (function () {
    function Player(x, y) {
        this.width = 200;
        this.height = 200;
        this.jump = false;
        this.speedX = 0;
        this.speedY = 0;
        this.color = '#E44C4A';
        this.x = x;
        this.y = y;
    }
    Player.prototype.update = function (input) {
        console.log('update');
        if (input.up && !this.jump) {
            this.speedY = 500;
            this.y -= this.speedY;
            this.jump = true;
        }
        if (input.left) {
            this.speedX = 10;
            this.x -= this.speedX;
        }
        if (input.right) {
            this.speedX = 10;
            this.x += this.speedX;
        }
        this.speedY = 30 * 0.9;
        this.y += this.speedY;
        if (this.y > 700) {
            this.y = 700;
            this.jump = false;
        }
    };
    Player.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Player;
}());
exports.Player = Player;
