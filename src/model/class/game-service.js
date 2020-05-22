"use strict";
exports.__esModule = true;
var GameService = /** @class */ (function () {
    function GameService() {
    }
    // On vérifie s'il y a collusion entre deux sprites
    GameService.prototype.checkCollision = function (a, b) {
        // On vérifie si A et B sont sur la même mapsheet et s'il y a collision
        if ((b.x > a.x + a.width ||
            b.x < a.x - b.width ||
            b.y > a.y + a.height ||
            b.y < a.y - b.height)) { // Pas de collision
            return false;
        }
        else { // collision
            return true;
        }
    };
    // On réagit à la collision
    GameService.prototype.handleCollision = function (a, b) {
        // if (false
        //     // (a.y + a.height < b.y + 20 &&
        //     // a.y + a.height > b.y )
        //     // && ((a.x + a.width > b.x && a.x + a.width < b.x + b.width) 
        //     // || (a.x < b.x + b.width && a.x > b.x))
        // ){
        //     alert('collision sur plateforme');
        // }
    };
    return GameService;
}());
exports.GameService = GameService;
