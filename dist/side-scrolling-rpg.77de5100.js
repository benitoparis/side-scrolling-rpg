// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/model/class/damage-zone.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DamageZone =
/** @class */
function () {
  function DamageZone(x, y, width, height) {
    this.color = '#DC33B8';
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  return DamageZone;
}();

exports.DamageZone = DamageZone;
},{}],"src/model/class/player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var damage_zone_1 = require("./damage-zone");

var Player =
/** @class */
function () {
  function Player(x, y) {
    this.faceX = 0;
    this.faceY = 64;
    this.width = 64;
    this.height = 64;
    this.jump = false;
    this.speedX = 0;
    this.speedY = 0;
    this.color = '#E44C4A';
    this.formerDirection = 'standing';
    this.groundY = 704;
    this.currentLoopIndex = 0;
    this.currentCycleLoop = [];
    this.rightCycleLoop = [{
      faceX: 0,
      faceY: 64
    }, {
      faceX: 32,
      faceY: 64
    }, {
      faceX: 0,
      faceY: 64
    }, {
      faceX: 64,
      faceY: 64
    }];
    this.leftCycleLoop = [{
      faceX: 0,
      faceY: 32
    }, {
      faceX: 32,
      faceY: 32
    }, {
      faceX: 0,
      faceY: 32
    }, {
      faceX: 64,
      faceY: 32
    }];
    this.upCycleLoop = [{
      faceX: 0,
      faceY: 96
    }, {
      faceX: 32,
      faceY: 96
    }, {
      faceX: 0,
      faceY: 96
    }, {
      faceX: 64,
      faceY: 96
    }];
    this.downCycleLoop = [{
      faceX: 0,
      faceY: 0
    }, {
      faceX: 32,
      faceY: 0
    }, {
      faceX: 0,
      faceY: 0
    }, {
      faceX: 64,
      faceY: 0
    }];
    this.x = x;
    this.y = y;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
  }

  Player.prototype.update = function (input) {
    // if (input.attack){ // Si le joueur attaque
    //     this.attack(true);
    // } else if (this.isAttacking && this.attackTimeFrame < 60){
    //     this.attackTimeFrame++;
    // } else {
    //     this.attack(false);
    // }
    if (input.up && this.jump === false) {
      this.speedY = 230;
      this.jump = true;
      this.y -= this.speedY;
    }

    this.speedX = this.speedX * 0.90;
    this.x += this.speedX;

    if (input.left) {
      this.speedX = -1;
      this.formerDirection = 'left';
    }

    if (input.right) {
      this.speedX = 1;
      this.formerDirection = 'right';
    }

    this.speedY = 1;
    this.y += this.speedY;

    if (this.y + this.height > this.groundY) {
      // Si le player se trouve plus bas que palier
      this.y = this.groundY - 64;
      this.jump = false;
    }

    if (this.x < 300) {
      // On empeche le joueur d'aller au bord gauche de la map courante
      this.x = this.x + 10;
    } else if (this.x > 4000) {
      // On empeche le joueur d'aller au bord droit de la map courante
      this.x = this.x - 10;
    }

    this.updateFaceCrop(input);
    this.updateDamageZone(input);
  };

  Player.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
  }; // Méthode appelée quand le bouton de saut est touché


  Player.prototype.setJump = function (status) {
    this.jump = status;
  }; // Méthode appelée quand le bouton d'action est touchée


  Player.prototype.attack = function (status) {
    this.isAttacking = status;
    this.attackTimeFrame = 0;
  }; // Méthode pour définir les coordonnées de la posture à croper


  Player.prototype.updateFaceCrop = function (input) {
    // On incrémente le compteur de pas
    if (this.currentLoopIndex < 3) {
      this.currentLoopIndex++;
    } else if (this.currentLoopIndex === 3) {
      this.currentLoopIndex = 0;
    }

    if (input.left) {
      this.currentCycleLoop = this.leftCycleLoop;
    } else if (input.right) {
      this.currentCycleLoop = this.rightCycleLoop;
    }

    if (this.formerDirection === 'right' && this.speedX < 0.1) {
      // A l'arret vers la droite
      this.faceX = 0;
      this.faceY = 64;
    } else if (this.formerDirection === 'left' && this.speedX > -0.1) {
      // A l'arret la gauche
      this.faceX = 0;
      this.faceY = 32;
    } else if (this.formerDirection === 'standing' && this.speedX < 0.1) {
      this.faceX = 0;
      this.faceY = 64;
    } else {
      // Il avance
      this.faceX = this.currentCycleLoop[this.currentLoopIndex].faceX;
      this.faceY = this.currentCycleLoop[this.currentLoopIndex].faceY;
    }

    console.log('this.formerDirection', this.formerDirection);
    console.log('this.speedX', this.speedX);
  }; // On met à jour la zone d'attaque devant le joueur


  Player.prototype.updateDamageZone = function (input) {
    var x;
    var y = this.y - this.height / 2;

    if (this.formerDirection === 'left') {
      // Si direction vers la gauche
      x = this.x - this.width / 2;
    } else if (this.formerDirection === 'right') {
      // Si direction vers la droite
      x = this.x + this.width / 2;
    }

    this.damageZone = new damage_zone_1.DamageZone(x, y, this.width, this.height);
    console.log('this.damageZone', this.damageZone);
  };

  return Player;
}();

exports.Player = Player;
},{"./damage-zone":"src/model/class/damage-zone.ts"}],"src/model/class/enemy.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("../../../index");

var Enemy =
/** @class */
function () {
  //currentLoopIndex = 0;
  //rightCycleLoop = [{faceX:0,faceY:64}, {faceX:32,faceY:64},{faceX:0,faceY:64},{faceX:64,faceY:64}];
  //leftCycleLoop = [{faceX:0,faceY:32}, {faceX:32,faceY:32},{faceX:0,faceY:32},{faceX:64,faceY:32}];
  //upCycleLoop = [{faceX:0,faceY:96}, {faceX:32,faceY:96},{faceX:0,faceY:96},{faceX:64,faceY:96}];
  //downCycleLoop = [{faceX:0,faceY:0}, {faceX:32,faceY:0},{faceX:0,faceY:0},{faceX:64,faceY:0}];
  // Constructeur de la classe des ennemies
  function Enemy(x, y) {
    this.width = 64;
    this.height = 64; //reference: string;
    //characterImg: Object;
    //mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));

    this.speedX = 2;
    this.speedY = 2;
    this.color = '#6BE44A'; //direction: string;

    this.faceX = 0;
    this.faceY = 64; //this.name = name;
    //this.reference = reference;
    //this.characterImg = config.getImage(this.reference);

    /* propriétés communes sprites animés */

    this.x = x; // Position X sur la map

    this.y = y; // Position Y sur la map

    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2; // let that  = this;
    // this.autoMove = setInterval(() => { that.setRandomDirection();}, 2000);
    //this.direction = 'south';
  } // Méthode qui va modifier les coordonnées du people.


  Enemy.prototype.update = function () {
    this.setCurrentLoopIndex();

    switch (this.direction) {
      case 'east':
        this.speedX = 2;
        this.x = this.x + this.speedX; // On détermine la positon x/y du crop du personnage

        this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;
        break;

      case 'west':
        this.speedX = 2;
        this.x = this.x - this.speedX; // On détermine la positon x/y du crop du personnage

        this.faceX = this.leftCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.leftCycleLoop[this.currentLoopIndex].faceY;
        break;

      case 'north':
        this.speedY = 2;
        this.y = this.y - this.speedY; // On détermine la positon x/y du crop du personnage

        this.faceX = this.upCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.upCycleLoop[this.currentLoopIndex].faceY;
        break;

      case 'south':
        this.speedY = 2;
        this.y = this.y + this.speedY; // On détermine la positon x/y du crop du personnage

        this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
        break;

      default:
        alert('default update');
        break;
    }

    this.setCenter();
    this.setMapIndexPosition();
  }; // Réinitialise les cordonnées x /y du people


  Enemy.prototype.resetCoordinates = function (x, y) {
    this.x = x;
    this.y = y;
  }; // Renvoie une direction aléatoirement


  Enemy.prototype.setRandomDirection = function () {
    this.direction = index_1.gameService.randomDirection();
  }; // On recalcule le centre du people


  Enemy.prototype.setCenter = function () {
    // On recalcule le centre du people
    this.centerX = this.x + this.width - this.width / 2;
    this.centerY = this.y + this.height - this.height / 2;
  }; // Méthode qui renseigne l'index de la séquence de marche


  Enemy.prototype.setCurrentLoopIndex = function () {
    if (this.frame === this.fps) {
      this.frame = 0;
    } else {
      this.frame++;
    } // On détermine quel sprite afficher


    if (this.frame % 3 === 0) {
      // on décide d'incrémenter l'index toutes les 3 frames
      this.currentLoopIndex++;
    } // Si l'index est supérieur au nombre de position possible on le repositionne à zero


    if (this.currentLoopIndex >= this.rightCycleLoop.length) {
      this.currentLoopIndex = 0;
    }
  }; // Méthode pour réinitialiser la position du people dans la map


  Enemy.prototype.setPosition = function (destination) {
    this.x = destination.x;
    this.y = destination.y; //this.currentWorldPosition =  new WorldPosition(destination.worldId,destination.mapSheetId );

    this.setCenter();
    this.setMapIndexPosition();
  }; // Méthode pour setter l'index du figuant sur la map


  Enemy.prototype.setMapIndexPosition = function () {
    this.mapIndexPosition = Math.floor(this.centerX / 48) + 60 * Math.floor(this.centerY / 48);
  };

  return Enemy;
}();

exports.Enemy = Enemy;
},{"../../../index":"index.ts"}],"src/model/class/display-controller.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var player_1 = require("./player");

var enemy_1 = require("./enemy");

var DisplayController =
/** @class */
function () {
  function DisplayController(canvas) {
    this.canvas = canvas;
    this.canvas.width = 800; //window.innerWidth;

    this.canvas.height = 600; //window.innerHeight;

    this.ctx = this.canvas.getContext('2d');
  }

  DisplayController.prototype.initCanvas = function () {};

  DisplayController.prototype.draw = function (shape, viewPort, sprite) {
    var x = sprite.x,
        y = sprite.y,
        width = sprite.width,
        height = sprite.height,
        color = sprite.color;
    console.log('draw');
    this.ctx.fillStyle = color;

    switch (shape) {
      case 'rectangle':
        this.ctx.fillRect(x - viewPort.x, y - viewPort.y, width, height);
        break;

      default:
        this.ctx.fillRect(x, y, width, height);
        break;
    }
  };

  ;

  DisplayController.prototype.drawSprite = function (characterImg, viewPort, sprite) {
    // On va déterminer les coordonnées Y/Y du sprite à affichernsur le canvas
    var canvasX;
    var canvasY;

    if (sprite instanceof player_1.Player) {
      canvasX = this.canvas.width / 2 - sprite.width / 2;
      canvasY = this.canvas.height - 256 - sprite.height;
    }

    if (sprite instanceof enemy_1.Enemy) {
      canvasX = sprite.x - viewPort.x;
      canvasY = sprite.y - viewPort.y;
    }

    this.ctx.drawImage(characterImg, sprite.faceX, // Position X de la partie à croper
    sprite.faceY, // Position Y de la partie à croper
    32, // Largeur de la partie à croper
    32, // Hauteur de la partie à corper
    canvasX, // on l'affiche toujours au milieu du canvas // Position x de l'image à croper sur le canvas
    canvasY, // on l'affiche toujours au milieu du canvas // Position y de l'image à croper sur le canvas
    sprite.width, // Largeur de la partie cropée
    sprite.height // Hauteur de la partie cropée
    );
  };

  ;

  DisplayController.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  ;

  DisplayController.prototype.drawBackground = function (backgroundImg, player) {
    this.ctx.drawImage(backgroundImg, // Objet image représentant le background
    player.x - this.canvas.width / 2, // Position X de la partie à croper
    //player.y - 288.5, // Position Y de la partie à croper
    0, // Position Y de la partie à croper
    this.canvas.width, // Largeur de la partie à croper
    this.canvas.height, // Hauteur de la partie à corper
    0, // Position X sur le canvas de l'image cropée
    0, // Position Y sur le canvas de l'image cropée
    this.canvas.width, // Largeur de l'image cropée sur le canvas
    this.canvas.height // Hauteur de l'image cropée sur le canvas
    );
  };

  ;

  DisplayController.prototype.drawImg = function (img, cropX, cropY, canvasX, canvasY) {
    this.ctx.drawImage(img, // Objet image représentant le background
    cropX, // Position X de la partie à croper
    //player.y - 288.5, // Position Y de la partie à croper
    cropY, // Position Y de la partie à croper
    64, // Largeur de la partie à croper
    64, // Hauteur de la partie à corper
    canvasX, // Position X sur le canvas de l'image cropée
    canvasY, // Position Y sur le canvas de l'image cropée
    64, // Largeur de l'image cropée sur le canvas
    64 // Hauteur de l'image cropée sur le canvas
    );
  };

  DisplayController.prototype.resizeCanvas = function (event) {
    console.log('event', event);
    this.canvas.width = 800; //window.innerWidth;

    this.canvas.height = 600; // window.innerHeight;
  };

  DisplayController.prototype.drawTxt = function (txt) {
    this.ctx.font = "20px Arial";
    this.ctx.fillText(txt, 10, 50);
  };

  return DisplayController;
}();

exports.DisplayController = DisplayController;
},{"./player":"src/model/class/player.ts","./enemy":"src/model/class/enemy.ts"}],"src/model/class/input-controller.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var InputController =
/** @class */
function () {
  function InputController() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.attack = false;
  }

  return InputController;
}();

exports.InputController = InputController;
},{}],"src/model/class/game-service.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameService =
/** @class */
function () {
  function GameService() {} // On vérifie s'il y a collusion entre deux sprites


  GameService.prototype.checkCollision = function (a, b) {
    // On vérifie si A et B sont sur la même mapsheet et s'il y a collision
    if (b.x > a.x + a.width || b.x < a.x - b.width || b.y > a.y + a.height || b.y < a.y - b.height) {
      // Pas de collision
      return false;
    } else {
      // collision
      return true;
    }
  }; // On réagit à la collision


  GameService.prototype.handleCollision = function (a, b) {
    if (a.y + a.height < b.y + 20 && a.y + a.height > b.y && (a.x + a.width > b.x && a.x + a.width < b.x + b.width || a.x < b.x + b.width && a.x > b.x)) {
      return true;
    } else {
      return false;
    }
  }; // Méthode qui retourne un chiffre compris entre A et B


  GameService.prototype.rangeNumber = function (a, b) {
    return Math.floor(Math.random() * b) + a;
  };

  ; // Méthode qui renvoie une direction aléatoire

  GameService.prototype.randomDirection = function () {
    var randomNumber = this.rangeNumber(1, 4);
    var direction = '';

    switch (randomNumber) {
      case 1:
        direction = 'east';
        break;

      case 2:
        direction = 'west';
        break;

      case 3:
        direction = 'north';
        break;

      case 4:
        direction = 'south';
        break;
    }

    return direction;
  };

  return GameService;
}();

exports.GameService = GameService;
},{}],"src/model/class/viewport.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ViewPort =
/** @class */
function () {
  function ViewPort(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  ViewPort.prototype.defineViewPoint = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  return ViewPort;
}();

exports.ViewPort = ViewPort;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
}); /// On importe les classes ici

var display_controller_1 = require("./src/model/class/display-controller");

var input_controller_1 = require("./src/model/class/input-controller");

var player_1 = require("./src/model/class/player");

var game_service_1 = require("./src/model/class/game-service");

var enemy_1 = require("./src/model/class/enemy");

var viewport_1 = require("./src/model/class/viewport");

var canvas = document.getElementById('game');
var displayController = new display_controller_1.DisplayController(canvas);
var player = new player_1.Player(400, 600);
var inputController = new input_controller_1.InputController();
var viewPort = new viewport_1.ViewPort(0, 0, 800, 600);
exports.gameService = new game_service_1.GameService();
var enemiesList = [];
var mapArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 5, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
var tileSetImg = document.getElementById('tileset');
var playerImg = document.getElementById('heros6');
var enemyImg = document.getElementById('personnage-important2');
var collideBrick; // Méthode pour créer des ennemis

var initEnemies = function initEnemies(count) {
  // 0n crée plusieurs ennemis
  for (var i = 0; i < count; i++) {
    var x = exports.gameService.rangeNumber(400, 1500);
    var y = 640;
    enemiesList = __spreadArrays(enemiesList, [new enemy_1.Enemy(x, y)]);
  }
};

var brickList = [];

var initPlateforms = function initPlateforms(count) {
  var _loop_1 = function _loop_1(i) {
    var newBrick = {
      x: Math.random() * 3000,
      y: Math.random() * canvas.height - 400,
      width: 300,
      height: 100,
      color: '#4AA5E4'
    };

    if (brickList.length === 0) {
      brickList = __spreadArrays(brickList, [newBrick]);
    }

    brickList.forEach(function (item) {
      if (!exports.gameService.checkCollision(item, newBrick)) {
        // Si pas de collision avec une brique existante
        // On l'ajoute à la liste des briques
        brickList = __spreadArrays(brickList, [newBrick]);
      }
    });
  }; // On construit les plateformes aléatoirement


  for (var i = 0; i < count; i++) {
    _loop_1(i);
  }
};

initEnemies(5);
initPlateforms(6);

var handleStart = function handleStart(event) {
  if (+event.targetTouches[0].clientX > 400 && +event.targetTouches[0].clientY < 300) {
    inputController.up = true;
  } else if (+event.targetTouches[0].clientX > 400 && +event.targetTouches[0].clientY > 300) {
    inputController.isAttacking = true;
  } else if (+event.targetTouches[0].clientX > 0 && +event.targetTouches[0].clientX < 200) {
    inputController.left = true;
    inputController.right = false;
  } else if (+event.targetTouches[0].clientX > 200 && +event.targetTouches[0].clientX < 400) {
    inputController.left = false;
    inputController.right = true;
    inputController.attack = true;
  }
};

var handleEnd = function handleEnd(event) {
  inputController.up = false;
  inputController.right = false;
  inputController.left = false;
};

canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false); // canvas.addEventListener("touchcancel", handleCancel, false);
// canvas.addEventListener("touchleave", handleLeave, false);
// canvas.addEventListener("touchmove", handleMove, false);
// L'animation générale

function loop() {
  displayController.clear(); //displayController.drawBackground(backGroundImg, player);

  var columNb = 80;
  var indexRaw = 0;
  var tileSize = 64;
  var canvasX = 0;
  var canvasY = 0;
  var tileX = 0;
  var tileY = 0;
  var cropX;
  var cropY;
  var xMin = Math.floor(viewPort.x / tileSize); // Colone minimale

  var yMin = Math.floor(viewPort.y / tileSize); // Rangée Minimum

  var xMax = Math.ceil((viewPort.x + viewPort.width) / tileSize); // Colone maximale

  var yMax = Math.ceil((viewPort.y + viewPort.height) / tileSize); // Rangée Minimale

  for (var x = xMin; x < xMax; x++) {
    for (var y = yMin; y < yMax; y++) {
      var value = mapArray[y * columNb + x];
      canvasX = x * tileSize - viewPort.x;
      canvasY = y * tileSize - viewPort.y;

      switch (value) {
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

      if (value !== 0) {
        displayController.drawImg(tileSetImg, cropX, cropY, canvasX, canvasY);
      }
    }
  }

  player.update(inputController);
  displayController.drawSprite(playerImg, viewPort, player);
  viewPort.defineViewPoint(player.x - (800 / 2 - player.width / 2), player.y - 600 / 2 + 20, 800, 600);
  displayController.draw('rectangle', viewPort, player.damageZone);

  for (var i = 0; i < mapArray.length; i++) {
    indexRaw = Math.floor(i / columNb);
    tileX = (i - indexRaw * columNb) * tileSize;
    tileY = indexRaw * tileSize; // switch(mapArray[i]){
    //     case 0:
    //         cropX = 320;
    //         cropY = 320;
    //         break;
    //     case 1:
    //         cropX = 64;
    //         cropY = 0;
    //         break;
    // }

    if (mapArray[i] === 3) {
      if (exports.gameService.handleCollision(player, {
        x: tileX,
        y: tileY,
        width: 64,
        height: 64,
        color: ''
      })) {
        player.setJump(false);
        player.groundY = tileY;
        player.update(inputController);
        var txt = "player.x : " + player.x + ", player.y : " + player.y + ", tileX : " + tileX + ", tileY : " + tileY;
        displayController.drawTxt(txt);
        viewPort.defineViewPoint(player.x - (800 / 2 - player.width / 2), player.y - 600 / 2 + 20, 800, 600);
      } else {
        player.groundY = 704;
        player.update(inputController);
        var txt = "player.x : " + player.x + ", player.y : " + player.y;
        displayController.drawTxt(txt);
        viewPort.defineViewPoint(player.x - (800 / 2 - player.width / 2), player.y - 600 / 2 + 20, 800, 600);
      }
    }
  } // if (inputController.isAttacking){
  //     displayController.draw('rectangle', player.damageZone);
  // }
  // enemiesList.forEach((enemy, index) => {
  //     displayController.drawSprite(enemyImg, viewPort, enemy);
  //     // if(player.damageZone && gameService.checkCollision(player.damageZone, enemy)){
  //     //     alert('collision entre ennemi et damagezone');
  //     //     enemiesList.splice(index, 1); 
  //     // }
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
} // fetch('/levels.json').then(data=> {
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


window.addEventListener('resize', displayController.resizeCanvas, false);
window.addEventListener('orientationchange', displayController.resizeCanvas, false);
loop();
},{"./src/model/class/display-controller":"src/model/class/display-controller.ts","./src/model/class/input-controller":"src/model/class/input-controller.ts","./src/model/class/player":"src/model/class/player.ts","./src/model/class/game-service":"src/model/class/game-service.ts","./src/model/class/enemy":"src/model/class/enemy.ts","./src/model/class/viewport":"src/model/class/viewport.ts"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50708" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/side-scrolling-rpg.77de5100.js.map