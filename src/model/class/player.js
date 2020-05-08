"use strict";
exports.__esModule = true;
var Player = /** @class */ (function () {
    function Player(x, y) {
        this.width = 200;
        this.height = 200;
        this.jump = false;
        this.x = x;
        this.y = y;
    }
    Player.prototype.update = function (input) {
        console.log('update');
        if (input.up && !this.jump) {
            this.y -= 200;
            this.jump = true;
        }
        if (input.left) {
            this.x -= 0.5;
        }
        if (input.right) {
            this.x += 0.5;
        }
        this.y += 1;
        if (this.y > 800) {
            this.y = 900;
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
