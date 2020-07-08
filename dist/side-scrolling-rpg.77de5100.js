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
},{}],"src/model/class/character-sprite.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var damage_zone_1 = require("./damage-zone");

var CharacterSprite =
/** @class */
function () {
  function CharacterSprite(name, x, y, characterImg) {
    this.lifeCredit = 10;
    this.x = 500;
    this.y = 700;
    this.width = 64;
    this.height = 64;
    this.mapIndexPosition = Math.floor(this.centerX / 48) + 60 * Math.floor(this.centerY / 48);
    this.speedX = 0;
    this.speedY = 0;
    this.color = '#6BE44A';
    this.currentDirection = 'right';
    this.jump = false;
    this.groundY = 704;
    this.currentLoopIndex = 0;
    this.currentCycleLoop = [];
    this.faceX = 64;
    this.faceY = 64;
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
    this.name = name;
    this.x = x;
    this.y = y;
    this.characterImg = characterImg;
    this.updateDamageZone();
  } // Renseigne la position


  CharacterSprite.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
    this.setCenter();
  }; // On recalcule les coordonnées du centre de l'entité


  CharacterSprite.prototype.setCenter = function () {
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
  }; // Méthode appelée quand le bouton de saut est touché


  CharacterSprite.prototype.setJump = function (status) {
    this.jump = status;
  };

  Object.defineProperty(CharacterSprite.prototype, "getLifeCredit", {
    get: function get() {
      return this.lifeCredit;
    },
    enumerable: true,
    configurable: true
  });
  ;
  Object.defineProperty(CharacterSprite.prototype, "setLifeCredit", {
    set: function set(value) {
      this.lifeCredit = value;
    },
    enumerable: true,
    configurable: true
  }); // Méthode appelée quand le personnage attaque

  CharacterSprite.prototype.attack = function (status) {
    this.isAttacking = status;
    this.attackTimeFrame = 0;
  }; // On met à jour la zone d'attaque devant le sprite


  CharacterSprite.prototype.updateDamageZone = function () {
    var x;
    var y = this.y - this.height / 2;

    if (this.currentDirection === 'left') {
      // Si direction vers la gauche
      x = this.x - this.width / 2;
    } else if (this.currentDirection === 'right') {
      // Si direction vers la droite
      x = this.x + this.width / 2;
    }

    this.damageZone = new damage_zone_1.DamageZone(x, y, this.width, this.height);
  };

  CharacterSprite.prototype.setmapIndexPosition = function () {
    this.mapIndexPosition = Math.floor(this.centerX / this.width) + 80 * Math.floor(this.centerY / this.height);
  };

  return CharacterSprite;
}();

exports.CharacterSprite = CharacterSprite;
},{"./damage-zone":"src/model/class/damage-zone.ts"}],"src/model/class/player.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("../../../index");

var character_sprite_1 = require("./character-sprite");

var Player =
/** @class */
function (_super) {
  __extends(Player, _super);

  function Player(name, x, y, characterImg) {
    var _this = this;

    console.log('constructeur player');
    _this = _super.call(this, name, x, y, characterImg) || this;
    return _this;
  }

  Player.prototype.update = function (input) {
    if (input.attack) {
      // Si le joueur attaque
      this.attack(true);
    } else if (this.isAttacking && this.attackTimeFrame < 60) {
      this.attackTimeFrame++;
    } else {
      this.attack(false);
    }

    if (input.up && this.jump === false) {
      this.speedY = 230;
      this.jump = true;
      this.y -= this.speedY;
    }

    if (input.left) {
      this.speedX = -1;
      this.currentDirection = 'left';
    }

    if (input.right) {
      this.speedX = 1;
      this.currentDirection = 'right';
    }

    this.speedY = 1;
    this.y += this.speedY;
    this.speedX = this.speedX * 0.90;
    this.x += this.speedX;

    if (this.y + this.height > this.groundY) {
      // Si le player se trouve plus bas que palier
      this.y = this.groundY - 64;
      this.jump = false;
    }

    if (this.x < 300) {
      // On empeche le joueur d'aller au bord gauche de la map courante
      this.x = this.x + 10;
    } else if (this.x > index_1.map.getMapWidth - 300) {
      // On empeche le joueur d'aller au bord droit de la map courante
      this.x = this.x - 10;
    }

    this.updateFaceCrop(input);
    this.updateDamageZone();
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

    if (this.currentDirection === 'right' && this.speedX < 0.1) {
      // A l'arret vers la droite
      this.faceX = 0;
      this.faceY = 64;
    } else if (this.currentDirection === 'left' && this.speedX > -0.1) {
      // A l'arret la gauche
      this.faceX = 0;
      this.faceY = 32;
    } else if (this.currentDirection === 'standing' && this.speedX < 0.1) {
      this.faceX = 0;
      this.faceY = 64;
    } else {
      // Il avance
      this.faceX = this.currentCycleLoop[this.currentLoopIndex].faceX;
      this.faceY = this.currentCycleLoop[this.currentLoopIndex].faceY;
    }
  };

  return Player;
}(character_sprite_1.CharacterSprite);

exports.Player = Player;
},{"../../../index":"index.ts","./character-sprite":"src/model/class/character-sprite.ts"}],"src/model/class/enemy.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var character_sprite_1 = require("./character-sprite");

var Enemy =
/** @class */
function (_super) {
  __extends(Enemy, _super); // Constructeur de la classe des ennemies


  function Enemy(name, x, y, characterImg, gameService, player) {
    var _this = _super.call(this, name, x, y, characterImg) || this;

    _this.gameService = gameService;
    _this.player = player;
    console.log('dans constucteur player', player);
    return _this;
  } // Méthode qui va modifier les coordonnées du people.


  Enemy.prototype.update = function () {
    console.log('gameService', this.gameService);
    console.log('playerin', this.player);
    var distance = this.gameService.getDistance(this.player.x, this.x);

    if (distance < 200 && this.player.x > this.x) {
      this.currentDirection = 'right';
    } else if (distance < 200 && this.player.x < this.x) {
      this.currentDirection = 'left';
    } else {
      this.currentDirection = 'standing';
    }

    switch (this.currentDirection) {
      case 'right':
        this.speedX = 2;
        this.x = this.x + this.speedX; // On détermine la positon x/y du crop du personnage

        this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;
        break;

      case 'left':
        this.speedX = 2;
        this.x = this.x - this.speedX; // On détermine la positon x/y du crop du personnage

        this.faceX = this.leftCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.leftCycleLoop[this.currentLoopIndex].faceY;
        break;
      // case 'north':
      //   this.speedY = 2;
      //   this.y = (this.y - this.speedY);
      //   // On détermine la positon x/y du crop du personnage
      //   this.faceX = this.upCycleLoop[this.currentLoopIndex].faceX;
      //   this.faceY = this.upCycleLoop[this.currentLoopIndex].faceY;
      //   break;
      // case 'south':
      //   this.speedY = 2;
      //   this.y = (this.y + this.speedY);
      //   // On détermine la positon x/y du crop du personnage
      //   this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
      //   this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
      //   break;

      case 'standing':
        this.speedY = 0;
        this.y = this.y + this.speedY; // On détermine la positon x/y du crop du personnage

        this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
        break;

      default:
        alert('default update');
        break;
    }

    this.updateFaceCrop();
    this.setCenter();
  }; // Renvoie une direction aléatoirement


  Enemy.prototype.setRandomDirection = function () {
    this.currentDirection = this.gameService.randomDirection();
  }; // Méthode pour définir les coordonnées de la posture à croper


  Enemy.prototype.updateFaceCrop = function () {
    // On incrémente le compteur de pas
    if (this.currentLoopIndex < 3) {
      this.currentLoopIndex++;
    } else if (this.currentLoopIndex === 3) {
      this.currentLoopIndex = 0;
    }

    if (this.currentDirection === 'left') {
      this.currentCycleLoop = this.leftCycleLoop;
    } else if (this.currentDirection === 'right') {
      this.currentCycleLoop = this.rightCycleLoop;
    }

    if (this.currentDirection === 'right' && this.speedX < 0.1) {
      // A l'arret vers la droite
      this.faceX = 0;
      this.faceY = 64;
    } else if (this.currentDirection === 'left' && this.speedX > -0.1) {
      // A l'arret la gauche
      this.faceX = 0;
      this.faceY = 32;
    } else if (this.currentDirection === 'standing' && this.speedX < 0.1) {
      this.faceX = 0;
      this.faceY = 64;
    } else {
      // Il avance
      this.faceX = this.currentCycleLoop[this.currentLoopIndex].faceX;
      this.faceY = this.currentCycleLoop[this.currentLoopIndex].faceY;
    }
  };

  return Enemy;
}(character_sprite_1.CharacterSprite);

exports.Enemy = Enemy;
},{"./character-sprite":"src/model/class/character-sprite.ts"}],"src/model/class/block.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Block =
/** @class */
function () {
  // Constructeur de la classe des ennemies
  function Block(x, y, gameService) {
    this.width = 64;
    this.height = 64; //mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));

    this.speedX = 2;
    this.speedY = 0;
    this.faceX = 0;
    this.faceY = 64; //this.name = name;
    //this.reference = reference;
    //this.characterImg = config.getImage(this.reference);

    /* propriétés communes sprites animés */

    this.x = x; // Position X sur la map

    this.y = y; // Position Y sur la map

    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
  } // Méthode qui va modifier les coordonnées du people.


  Block.prototype.update = function (player) {
    if (this.x < player.x && this.x + this.width > this.x) {
      // Si le joueur est en dessous du block
      // Le block tombe
      this.speedY = 2;
    }

    this.y = this.y + this.speedY; //this.updateFaceCrop()
    //this.setCenter();
  }; // Réinitialise les cordonnées x /y du people


  Block.prototype.resetCoordinates = function (x, y) {
    this.x = x;
    this.y = y;
  }; // Renvoie une direction aléatoirement


  Block.prototype.setRandomDirection = function () {//this.currentDirection = this.gameService.randomDirection();
    //console.log('setRandomDirection this.currentDirection',this.currentDirection);
  }; // On recalcule le centre du people


  Block.prototype.setCenter = function () {
    // On recalcule le centre du people
    this.centerX = this.x + this.width - this.width / 2;
    this.centerY = this.y + this.height - this.height / 2;
  }; // Méthode pour réinitialiser la position du people dans la map


  Block.prototype.setPosition = function (destination) {
    this.x = destination.x;
    this.y = destination.y; //this.currentWorldPosition =  new WorldPosition(destination.worldId,destination.mapSheetId );

    this.setCenter(); //this.setMapIndexPosition();
  }; // Méthode pour setter l'index du figuant sur la map


  Block.prototype.setMapIndexPosition = function () {//this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
  };

  return Block;
}();

exports.Block = Block;
},{}],"src/model/class/moving-plateform.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MovingPlateform =
/** @class */
function () {
  // Constructeur de la classe des plateformes
  function MovingPlateform(anchorX, anchorY, gameService) {
    this.width = 64;
    this.height = 64;
    this.speedX = 1;
    this.speedY = 0;
    this.faceX = 64;
    this.faceY = 128;
    this.anchorX = anchorX;
    this.anchorY = anchorY;
    this.x = anchorX;
    this.y = anchorY;
    this.gameService = gameService;
    this.setCenter();
  } // Méthode qui va modifier les coordonnées de la plateforme


  MovingPlateform.prototype.update = function () {
    var distance = this.gameService.getDistance(this.x, this.anchorX);
    console.log('distance', distance);

    if (distance >= 50 && this.x > this.anchorY) {
      this.x = this.x - this.speedX;
    } else if (distance >= 50 && this.x < this.anchorX) {
      this.x = this.x + this.speedX;
    } else {
      this.x = this.x + this.speedX;
    }
  }; // Réinitialise les cordonnées x /y de la plateforme


  MovingPlateform.prototype.setCoordinates = function (x, y) {
    this.x = x;
    this.y = y;
    this.setCenter();
  }; // On recalcule le centre


  MovingPlateform.prototype.setCenter = function () {
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
  };

  return MovingPlateform;
}();

exports.MovingPlateform = MovingPlateform;
},{}],"src/model/class/display-controller.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var player_1 = require("./player");

var enemy_1 = require("./enemy");

var block_1 = require("./block");

var moving_plateform_1 = require("./moving-plateform");

var DisplayController =
/** @class */
function () {
  function DisplayController(canvas) {
    this.canvas = canvas;
    this.canvas.width = 800; //window.innerWidth;

    this.canvas.height = 600; //window.innerHeight;

    this.ctx = this.canvas.getContext('2d');
  }

  DisplayController.prototype.draw = function (shape, viewPort, sprite) {
    var x = sprite.x,
        y = sprite.y,
        width = sprite.width,
        height = sprite.height,
        color = sprite.color;
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

    if (sprite instanceof enemy_1.Enemy || sprite instanceof block_1.Block || sprite instanceof moving_plateform_1.MovingPlateform) {
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
    this.canvas.width = 800; //window.innerWidth;

    this.canvas.height = 600; // window.innerHeight;
  };

  DisplayController.prototype.drawTxt = function (list) {
    var _this = this;

    list.forEach(function (elem) {
      _this.ctx.fillStyle = elem.color;
      _this.ctx.font = elem.font;

      _this.ctx.fillText(elem.txt, elem.canvasX, elem.canvasY);
    });
  }; // Méthode pour dessiner un fond de couleur


  DisplayController.prototype.dawBgColor = function (color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }; // Méthode pour afficher du texte sur fond noir


  DisplayController.prototype.drawStoryScreen = function (printDatas) {
    this.dawBgColor(printDatas.bgColor);
    this.drawTxt(printDatas.textList);
  };

  return DisplayController;
}();

exports.DisplayController = DisplayController;
},{"./player":"src/model/class/player.ts","./enemy":"src/model/class/enemy.ts","./block":"src/model/class/block.ts","./moving-plateform":"src/model/class/moving-plateform.ts"}],"src/model/class/input-controller.ts":[function(require,module,exports) {
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
exports.inputController = new InputController();
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

  ; // Calcule la distance entre a et b

  GameService.prototype.getDistance = function (a, b) {
    return Math.abs(a - b);
  }; // Méthode qui renvoie une direction aléatoire


  GameService.prototype.randomDirection = function () {
    var randomNumber = this.rangeNumber(1, 2);
    console.log('randomNumber', randomNumber);
    var direction = '';

    switch (randomNumber) {
      case 1:
        direction = 'right';
        break;

      case 2:
        direction = 'left';
        break;

      default:
        direction = 'right';
        break;
    }

    return direction;
  };

  return GameService;
}();

exports.GameService = GameService;
exports.gameService = new GameService();
},{}],"src/model/class/villager.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var character_sprite_1 = require("./character-sprite");

var Villager =
/** @class */
function (_super) {
  __extends(Villager, _super); // Constructeur de la classe des Villageois


  function Villager(name, x, y, characterImg, gameService) {
    var _this = _super.call(this, name, x, y, characterImg) || this;

    _this.gameService = gameService;
    var that = _this;
    _this.autoMove = setInterval(function () {
      that.setRandomDirection();
    }, 3000);
    return _this;
  } // Méthode qui va modifier les coordonnées.


  Villager.prototype.update = function () {
    switch (this.currentDirection) {
      case 'right':
        this.speedX = 2;
        this.x = this.x + this.speedX; // On détermine la positon x/y du crop du personnage

        this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;
        break;

      case 'left':
        this.speedX = 2;
        this.x = this.x - this.speedX; // On détermine la positon x/y du crop du personnage

        this.faceX = this.leftCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.leftCycleLoop[this.currentLoopIndex].faceY;
        break;
      // case 'north':
      //   this.speedY = 2;
      //   this.y = (this.y - this.speedY);
      //   // On détermine la positon x/y du crop du personnage
      //   this.faceX = this.upCycleLoop[this.currentLoopIndex].faceX;
      //   this.faceY = this.upCycleLoop[this.currentLoopIndex].faceY;
      //   break;
      // case 'south':
      //   this.speedY = 2;
      //   this.y = (this.y + this.speedY);
      //   // On détermine la positon x/y du crop du personnage
      //   this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
      //   this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
      //   break;

      default:
        alert('default update');
        break;
    }

    this.updateFaceCrop();
    this.setCenter();
  }; // Renvoie une direction aléatoirement


  Villager.prototype.setRandomDirection = function () {
    this.currentDirection = this.gameService.randomDirection();
  }; // Méthode pour définir les coordonnées de la posture à croper


  Villager.prototype.updateFaceCrop = function () {
    // On incrémente le compteur de pas
    if (this.currentLoopIndex < 3) {
      this.currentLoopIndex++;
    } else if (this.currentLoopIndex === 3) {
      this.currentLoopIndex = 0;
    }

    if (this.currentDirection === 'left') {
      this.currentCycleLoop = this.leftCycleLoop;
    } else if (this.currentDirection === 'right') {
      this.currentCycleLoop = this.rightCycleLoop;
    }

    if (this.currentDirection === 'right' && this.speedX < 0.1) {
      // A l'arret vers la droite
      this.faceX = 0;
      this.faceY = 64;
    } else if (this.currentDirection === 'left' && this.speedX > -0.1) {
      // A l'arret la gauche
      this.faceX = 0;
      this.faceY = 32;
    } else if (this.currentDirection === 'standing' && this.speedX < 0.1) {
      this.faceX = 0;
      this.faceY = 64;
    } else {
      // Il avance
      this.faceX = this.currentCycleLoop[this.currentLoopIndex].faceX;
      this.faceY = this.currentCycleLoop[this.currentLoopIndex].faceY;
    }
  };

  return Villager;
}(character_sprite_1.CharacterSprite);

exports.Villager = Villager;
},{"./character-sprite":"src/model/class/character-sprite.ts"}],"src/model/class/viewport.ts":[function(require,module,exports) {
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
},{}],"src/model/class/map.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Map =
/** @class */
function () {
  function Map(_a) {
    var nbCol = _a.nbCol,
        tileSize = _a.tileSize,
        collection = _a.collection;
    this.nbCol = nbCol;
    this.tileSize = tileSize;
    this.collection = collection;
    this.length = collection.length;
    this.nbRow = collection.length / nbCol;
    this.width = nbCol * tileSize;
    this.height = collection.length / nbCol * tileSize;
  }

  Object.defineProperty(Map.prototype, "getMapCollection", {
    get: function get() {
      return this.collection;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Map.prototype, "getMapWidth", {
    get: function get() {
      return this.width;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Map.prototype, "getMapHeight", {
    get: function get() {
      return this.height;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Map.prototype, "getLength", {
    get: function get() {
      return this.length;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Map.prototype, "getTileSize", {
    get: function get() {
      return this.tileSize;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Map.prototype, "getNbCol", {
    get: function get() {
      return this.nbCol;
    },
    enumerable: true,
    configurable: true
  });
  return Map;
}();

exports.Map = Map;
},{}],"src/model/class/tileSet.ts":[function(require,module,exports) {
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
});

var TileSet =
/** @class */
function () {
  function TileSet(_a) {
    var nbCol = _a.nbCol,
        nbRow = _a.nbRow,
        tileSize = _a.tileSize;
    this.imgTileSetCropList = [];
    this.nbCol = nbCol;
    this.nbRow = nbRow;
    this.tileSize = tileSize; // On constritue la liste des coordonnées des tuiles sur cette tileSet

    this.initImgTileSetCropList();
  } // On initialise la liste des coordonnés de crop


  TileSet.prototype.initImgTileSetCropList = function () {
    var cropX;
    var cropY;

    for (var y = 0; y < this.nbRow; y++) {
      for (var i = 0; i < this.nbCol; i++) {
        cropX = i * this.tileSize;
        cropY = y * this.tileSize;
        this.imgTileSetCropList = __spreadArrays(this.imgTileSetCropList, [{
          cropX: cropX,
          cropY: cropY
        }]);
      }
    }

    console.log('this.imgTileSetCropList', this.imgTileSetCropList);
  }; // Renvoie les coordonnées de l'image à croper en fonction d'un index de tuile


  TileSet.prototype.getCropCoordinates = function (id) {
    return this.imgTileSetCropList[id];
  };

  return TileSet;
}();

exports.TileSet = TileSet;
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

var villager_1 = require("./src/model/class/villager");

var viewport_1 = require("./src/model/class/viewport");

var block_1 = require("./src/model/class/block");

var map_1 = require("./src/model/class/map");

var tileSet_1 = require("./src/model/class/tileSet");

var moving_plateform_1 = require("./src/model/class/moving-plateform");

var enemiesList = [];
var villagersList = [];
var blockList = [];
var mapData = {
  nbCol: 80,
  tileSize: 64,
  collection: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 5, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
};
var imgTileSetData = {
  nbCol: 8,
  nbRow: 8,
  tileSize: 64
};
var imgCharacterTileSetData = {
  nbCol: 3,
  nbRow: 4,
  tileSize: 64
};
var tileSetImg = document.getElementById('tileset');
var playerImg = document.getElementById('heros6');
var enemyImg = document.getElementById('personnage-important2');
var villagerImg = document.getElementById('personnage-important2');
var tileSet = new tileSet_1.TileSet(imgTileSetData);
exports.map = new map_1.Map(mapData);
var canvas = document.getElementById('game');
var displayController = new display_controller_1.DisplayController(canvas);
var player = new player_1.Player('benoit', 400, 600, playerImg);
var movingPlateform = new moving_plateform_1.MovingPlateform(1000, 400, game_service_1.gameService); //const inputController =  new InputController();

var viewPort = new viewport_1.ViewPort(0, 0, 800, 600); // export const gameService = new GameService();
// Méthode pour créer des ennemis

var initEnemies = function initEnemies(count) {
  console.log('initplayer ', player); // 0n crée plusieurs ennemis

  for (var i = 0; i < count; i++) {
    var x = game_service_1.gameService.rangeNumber(400, 1500);
    var y = 640;
    enemiesList = __spreadArrays(enemiesList, [new enemy_1.Enemy('valor', x, y, enemyImg, game_service_1.gameService, player)]);
  }
}; // Méthode pour créer des villageois


var initVillagers = function initVillagers(count) {
  // 0n crée plusieurs ennemis
  for (var i = 0; i < count; i++) {
    var x = game_service_1.gameService.rangeNumber(400, 1500);
    var y = 640;
    villagersList = __spreadArrays(villagersList, [new villager_1.Villager('dalia', x, y, villagerImg, game_service_1.gameService)]);
  }
}; // Méthode pour créer des blocs


var initBlocks = function initBlocks(count) {
  // 0n crée plusieurs ennemis
  for (var i = 0; i < count; i++) {
    var x = game_service_1.gameService.rangeNumber(400, 1500);
    var y = game_service_1.gameService.rangeNumber(2, 100);
    console.log({
      x: x,
      y: y
    });
    blockList = __spreadArrays(blockList, [new block_1.Block(x, y, game_service_1.gameService)]);
  }
};

var initAll = function initAll() {
  initEnemies(5);
  initBlocks(3);
  initVillagers(2);
};

console.log('blockList', blockList);

var handleStart = function handleStart(event) {
  if (+event.targetTouches[0].clientX > 400 && +event.targetTouches[0].clientY < 300) {
    input_controller_1.inputController.up = true;
  } else if (+event.targetTouches[0].clientX > 400 && +event.targetTouches[0].clientY > 300) {
    input_controller_1.inputController.attack = true;
  } else if (+event.targetTouches[0].clientX > 0 && +event.targetTouches[0].clientX < 200) {
    input_controller_1.inputController.left = true;
  } else if (+event.targetTouches[0].clientX > 200 && +event.targetTouches[0].clientX < 400) {
    input_controller_1.inputController.right = true;
  }
};

var handleEnd = function handleEnd(event) {
  input_controller_1.inputController.up = false;
  input_controller_1.inputController.right = false;
  input_controller_1.inputController.left = false;
  input_controller_1.inputController.attack = false;
};

canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false); // canvas.addEventListener("touchcancel", handleCancel, false);
// canvas.addEventListener("touchleave", handleLeave, false);
// canvas.addEventListener("touchmove", handleMove, false);
// On crée tous les sprites et les éléments

initAll(); // L'animation générale

function loop() {
  displayController.clear();
  var columNb = 80;
  var indexRaw = 0;
  var canvasX = 0;
  var canvasY = 0;
  var tileX = 0;
  var tileY = 0;
  var xMin = Math.floor(viewPort.x / exports.map.getTileSize); // Colone minimale à dessiner

  var yMin = Math.floor(viewPort.y / exports.map.getTileSize); // Rangée Minimum à dessiner

  var xMax = Math.ceil((viewPort.x + viewPort.width) / exports.map.getTileSize); // Colonne maximale à dessiner

  var yMax = Math.ceil((viewPort.y + viewPort.height) / exports.map.getTileSize); // Rangée Minimale à dessiner

  for (var x = xMin; x < xMax; x++) {
    for (var y = yMin; y < yMax; y++) {
      var value = exports.map.getMapCollection[y * exports.map.getNbCol + x];
      canvasX = x * exports.map.getTileSize - viewPort.x;
      canvasY = y * exports.map.getTileSize - viewPort.y; // On récupère les coordonnées de l'index de tuile sur la tileSet

      var _a = tileSet.getCropCoordinates(value),
          cropX = _a.cropX,
          cropY = _a.cropY;

      if (value !== 0) {
        displayController.drawImg(tileSetImg, cropX, cropY, canvasX, canvasY);
      }
    }
  } // On affiche les blocks


  blockList.forEach(function (block) {
    block.update(player);
    displayController.drawSprite(tileSetImg, viewPort, block);

    if (!block.haveTouchedPlayer && game_service_1.gameService.checkCollision(player, block)) {
      // Si le block n'a pas encore percuté le joueur et qu'il y a collision
      block.haveTouchedPlayer = true; // On retire un point de crédit au joueur.

      player.setLifeCredit = player.getLifeCredit - 1;
    }
  });
  villagersList.forEach(function (villager) {//villager.update(player);
    //displayController.drawSprite(villagerImg, viewPort, villager);
  });
  movingPlateform.update();
  displayController.drawSprite(tileSetImg, viewPort, movingPlateform);
  player.update(input_controller_1.inputController);
  displayController.drawSprite(playerImg, viewPort, player);
  viewPort.defineViewPoint(player.x - (800 / 2 - player.width / 2), player.y - 600 / 2 + 20, 800, 600);

  if (player.isAttacking) {
    // Si le player attaque on affiche sa zone d'attaque représentée par un carré
    displayController.draw('rectangle', viewPort, player.damageZone);
  }

  for (var i = 0; i < exports.map.getLength; i++) {
    indexRaw = Math.floor(i / exports.map.getNbCol);
    tileX = (i - indexRaw * exports.map.getNbCol) * exports.map.getTileSize;
    tileY = indexRaw * exports.map.getTileSize;

    if (exports.map.getMapCollection[i] === 3) {
      if (game_service_1.gameService.handleCollision(player, {
        x: tileX,
        y: tileY,
        width: 64,
        height: 64,
        color: ''
      })) {
        player.setJump(false);
        player.groundY = tileY;
        player.update(input_controller_1.inputController);
        var txt = "player.x : " + player.x + ", player.y : " + player.y; //displayController.drawTxt(txt, 10, 50);

        var txt2 = "tileX : " + tileX + ", tileY : " + tileY; //displayController.drawTxt(txt2, 10, 100);

        viewPort.defineViewPoint(player.x - (800 / 2 - player.width / 2), player.y - 600 / 2 + 20, 800, 600);
      } else {
        player.groundY = 704;
        player.update(input_controller_1.inputController);
        var texteCoordonneesX = "player.x : " + player.x; //displayController.drawTxt(texteCoordonneesX, 10, 120);

        var texteCoordonneesY = "player.y : " + player.y; //displayController.drawTxt(texteCoordonneesY, 10, 150);

        var texteCreditsDispo = "Credits : " + player.getLifeCredit; //displayController.drawTxt(texteCreditsDispo, 10, 180);

        viewPort.defineViewPoint(player.x - (800 / 2 - player.width / 2), player.y - 600 / 2 + 20, 800, 600);
      }
    }
  }

  enemiesList.forEach(function (enemy, index) {
    console.log('enemy', enemy);
    enemy.update();
    displayController.drawSprite(enemyImg, viewPort, enemy);

    if (player.isAttacking && game_service_1.gameService.checkCollision(player.damageZone, enemy)) {
      alert('collision entre ennemi et damagezone');
      enemiesList.splice(index, 1);
    }
  });
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


var screen1 = {
  bgColor: '#000000',
  textList: [{
    txt: 'Actraiser',
    color: '#FFFFFF',
    font: '100px Comic Sans MS',
    canvasX: 150,
    canvasY: 100
  }, {
    txt: 'Press Start',
    color: '#FFFFFF',
    font: '40px Comic Sans MS',
    canvasX: 250,
    canvasY: 300
  }, {
    txt: 'copyright....',
    color: '#FFFFFF',
    font: '20px Comic Sans MS',
    canvasX: 250,
    canvasY: 400
  }]
};
displayController.drawStoryScreen(screen1); // On ajoute les évènement pour resizer le canvas
//window.addEventListener('resize', displayController.resizeCanvas, false);
//window.addEventListener('orientationchange', displayController.resizeCanvas, false);

window.addEventListener('keypress', loop, true);
},{"./src/model/class/display-controller":"src/model/class/display-controller.ts","./src/model/class/input-controller":"src/model/class/input-controller.ts","./src/model/class/player":"src/model/class/player.ts","./src/model/class/game-service":"src/model/class/game-service.ts","./src/model/class/enemy":"src/model/class/enemy.ts","./src/model/class/villager":"src/model/class/villager.ts","./src/model/class/viewport":"src/model/class/viewport.ts","./src/model/class/block":"src/model/class/block.ts","./src/model/class/map":"src/model/class/map.ts","./src/model/class/tileSet":"src/model/class/tileSet.ts","./src/model/class/moving-plateform":"src/model/class/moving-plateform.ts"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55122" + '/');

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