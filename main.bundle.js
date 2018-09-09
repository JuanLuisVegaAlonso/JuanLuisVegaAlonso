webpackJsonp([1,4],{

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__locationInfo__ = __webpack_require__(305);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameObject; });


var GameObject = /** @class */ (function () {
    function GameObject() {
        this.mass = 10;
        this.rollDrag = 0.1;
        this.locationInfo = new __WEBPACK_IMPORTED_MODULE_1__locationInfo__["a" /* LocationInfo */]();
        this.velocity = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](0, 0);
        this.acceleration = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](0, 0);
    }
    GameObject.prototype.nextStep = function (context) {
        this.locationInfo.position.move(this.velocity);
    };
    GameObject.prototype.getShape = function () {
        return this.shape;
    };
    return GameObject;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/GameObject.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playerShape__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_gameConfig__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vector__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__weapons_weaponFactory__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__locationInfo__ = __webpack_require__(305);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Player; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(id) {
        var _this = _super.call(this) || this;
        _this.dragForce = new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* Vector */](0, 0);
        _this.rollingForce = new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* Vector */](0, 0);
        _this.engineForce = new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* Vector */](0, 0);
        _this.rotationSpeed = 0;
        _this.rotationAcceleration = 0;
        _this.externalTorque = 0;
        _this.rotationDrag = 0.1;
        _this.rotationRollingDrag = 0.3;
        _this.locationInfo = new __WEBPACK_IMPORTED_MODULE_5__locationInfo__["a" /* LocationInfo */]();
        _this.id = id;
        _this.weapon = __WEBPACK_IMPORTED_MODULE_4__weapons_weaponFactory__["a" /* WeaponFactory */].createWeapon(_this.locationInfo);
        return _this;
    }
    Player.prototype.initShape = function () {
        if (this.size && this.color) {
            this.shape = new __WEBPACK_IMPORTED_MODULE_1__playerShape__["a" /* PlayerShape */](this.size, this.color);
        }
        else if (this.size) {
            this.shape = new __WEBPACK_IMPORTED_MODULE_1__playerShape__["a" /* PlayerShape */](this.size);
        }
        else {
            throw Error("Size is not defined");
        }
    };
    Player.prototype.nextStep = function (context) {
        this.calculateDragForce();
        this.calculateRollingForce();
        this.calculateAcceleration();
        this.calculateSpeed();
        this.calculateRotationDrag();
        this.calculateRotationRollingDrag();
        this.calculateRotationAcceleration();
        this.calculateRotationSpeed();
        this.locationInfo.rotation += this.rotationSpeed;
        _super.prototype.nextStep.call(this, context);
        this.weapon.nextStep(context);
        this.draw(context);
        this.resetEngineForce();
        this.resetTurning();
    };
    Player.prototype.draw = function (context) {
        this.shape.draw(context, this.locationInfo);
    };
    Player.prototype.resetEngineForce = function () {
        this.engineForce = new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* Vector */](0, 0);
    };
    Player.prototype.resetTurning = function () {
        this.externalTorque = 0;
    };
    Player.prototype.changeRotation = function (clockWise) {
        this.externalTorque = this.torque;
        this.clockwise = clockWise;
    };
    Player.prototype.forward = function () {
        var forceX = Math.sin(this.locationInfo.rotation - Math.PI * 3 / 4) * this.forwardThrottle;
        var forceY = Math.cos(this.locationInfo.rotation - Math.PI * 3 / 4) * this.forwardThrottle;
        this.engineForce.changeDirection(forceX, forceY);
    };
    Player.prototype.backward = function () {
        var forceX = -Math.sin(this.locationInfo.rotation - Math.PI * 3 / 4) * this.backwardThrottle;
        var forceY = -Math.cos(this.locationInfo.rotation - Math.PI * 3 / 4) * this.backwardThrottle;
        this.engineForce.changeDirection(forceX, forceY);
    };
    Player.prototype.calculateDragForce = function () {
        var forceDirection = this.velocity
            .getNormalized()
            .escalarMultiply(Math.pow(this.velocity.getModule(), 2))
            .escalarMultiply(-this.drag);
        this.dragForce.changeDirection(forceDirection.x, forceDirection.y);
    };
    Player.prototype.calculateRollingForce = function () {
        this.rollingForce.escalarMultiply(-this.rollDrag);
    };
    Player.prototype.calculateAcceleration = function () {
        this.acceleration.changeDirection(0, 0);
        this.acceleration
            .add(this.engineForce)
            .add(this.dragForce)
            .add(this.rollingForce)
            .escalarDivide(this.mass);
    };
    Player.prototype.calculateSpeed = function () {
        this.velocity.add(this.acceleration.escalarMultiply(__WEBPACK_IMPORTED_MODULE_2__constants_gameConfig__["a" /* frameRate */]));
    };
    Player.prototype.calculateRotationAcceleration = function () {
        var rotationForce = (this.externalTorque * (this.clockwise ? 1 : -1)) + this.rotationDragForce + this.rotationRollingDragForce;
        this.rotationAcceleration = rotationForce / this.mass;
    };
    Player.prototype.calculateRotationSpeed = function () {
        this.rotationSpeed = this.rotationSpeed + this.rotationAcceleration * __WEBPACK_IMPORTED_MODULE_2__constants_gameConfig__["a" /* frameRate */];
    };
    Player.prototype.calculateRotationDrag = function () {
        this.rotationDragForce = -this.rotationDrag * Math.pow(this.rotationSpeed, 2) * Math.sign(this.rotationSpeed);
    };
    Player.prototype.calculateRotationRollingDrag = function () {
        this.rotationRollingDragForce = -this.rotationRollingDrag * this.rotationSpeed;
    };
    Player.prototype.showCurrentInfo = function (message) {
        console.log(message + ' vx: ' + this.velocity.x + "  vy: " + this.velocity.y);
    };
    Player.prototype.shoot = function () {
        return this.weapon.shoot(this.locationInfo);
    };
    return Player;
}(__WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* GameObject */]));

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/player.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vector; });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this._x = x;
        this._y = y;
    }
    Vector.prototype.getModule = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Vector.prototype.getNormalized = function () {
        var moduleCalc = this.getModule();
        var normalizedX = 0;
        var normalizedY = 0;
        if (moduleCalc !== 0) {
            normalizedX = this.x / this.getModule();
            normalizedY = this.y / this.getModule();
        }
        return new Vector(normalizedX, normalizedY);
    };
    Vector.prototype.escalarMultiply = function (escalar) {
        this._x = escalar * this._x;
        this._y = escalar * this._y;
        return this;
    };
    Vector.prototype.escalarDivide = function (escalar) {
        this._x = this._x / escalar;
        this._y = this._y / escalar;
        return this;
    };
    Vector.prototype.add = function (otherVector) {
        this._x = this._x + otherVector.x;
        this._y = this._y + otherVector.y;
        return this;
    };
    Vector.prototype.changeDirection = function (newX, newY) {
        this._x = newX;
        this._y = newY;
    };
    Object.defineProperty(Vector.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
        },
        enumerable: true,
        configurable: true
    });
    return Vector;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/vector.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return frameRate; });
var frameRate = 1000 / 60;

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/gameConfig.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__point__ = __webpack_require__(463);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationInfo; });

var LocationInfo = /** @class */ (function () {
    function LocationInfo() {
        this.position = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* Point */](0, 0);
        this.rotation = 0;
    }
    return LocationInfo;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/locationInfo.js.map

/***/ }),

/***/ 348:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 348;


/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(458);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/main.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(635),
            styles: [__webpack_require__(630)]
        })
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/app.component.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__web_socket_web_socket_component__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_wrapper_game_wrapper_component__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__player_info_player_info_component__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__player_forces_player_forces_component__ = __webpack_require__(472);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__web_socket_web_socket_component__["a" /* WebSocketComponent */],
                __WEBPACK_IMPORTED_MODULE_6__game_wrapper_game_wrapper_component__["a" /* GameWrapperComponent */],
                __WEBPACK_IMPORTED_MODULE_7__player_info_player_info_component__["a" /* PlayerInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_8__player_forces_player_forces_component__["a" /* PlayerForcesComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/app.module.js.map

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/forcesColor.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_gameConfig__ = __webpack_require__(203);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameInstance; });

var GameInstance = /** @class */ (function () {
    function GameInstance(width, height, ctx, playerController) {
        this.height = height;
        this.width = width;
        this.ctx = ctx;
        this.playerController = playerController;
    }
    GameInstance.prototype.loop = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.playerController.evaluateInput();
        this.wallCollision();
        this.bulletWallColisionNotBucle();
        this.nextStep();
        this.timeout = setTimeout(function () { return _this.loop(); }, __WEBPACK_IMPORTED_MODULE_0__constants_gameConfig__["a" /* frameRate */]);
    };
    GameInstance.prototype.wallCollision = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player.locationInfo.position.x + player.velocity.x <= 0) {
                player.velocity.x = 0;
                player.locationInfo.position.x = 0;
            }
            if (player.locationInfo.position.y + player.velocity.y <= 0) {
                player.velocity.y = 0;
                player.locationInfo.position.y = 0;
            }
            if (player.locationInfo.position.x + player.velocity.x >= this.width) {
                player.velocity.x = 0;
                player.locationInfo.position.x = this.width;
            }
            if (player.locationInfo.position.y + player.velocity.y >= this.height) {
                player.velocity.y = 0;
                player.locationInfo.position.y = this.width;
            }
        }
    };
    GameInstance.prototype.nextStep = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.nextStep(this.ctx);
        }
    };
    GameInstance.prototype.bulletWallColisionNotBucle = function () {
        var _this = this;
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.weapon.ownBullets = player.weapon.ownBullets.filter(function (bullet) { return !_this.bulletWallColision(bullet); });
        }
    };
    GameInstance.prototype.bulletWallColision = function (bullet) {
        if (bullet.locationInfo.position.x + bullet.velocity.x <= 0) {
            return true;
        }
        if (bullet.locationInfo.position.y + bullet.velocity.y <= 0) {
            return true;
        }
        if (bullet.locationInfo.position.x + bullet.velocity.x >= this.width) {
            return true;
        }
        if (bullet.locationInfo.position.y + bullet.velocity.y >= this.height) {
            return true;
        }
        return false;
    };
    GameInstance.prototype.insertPlayers = function (players) {
        this.players = players;
    };
    return GameInstance;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/gameInstance.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_keys__ = __webpack_require__(470);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerController; });

var PlayerController = /** @class */ (function () {
    function PlayerController(player, key) {
        this.player = player;
        this.key = key;
    }
    PlayerController.prototype.evaluateInput = function () {
        var length = this.key.length;
        for (var i = 0; i < length; i++) {
            if (this.key[i]) {
                switch (i) {
                    case __WEBPACK_IMPORTED_MODULE_0__constants_keys__["a" /* keys */].keyA:
                        this.player.changeRotation(true);
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__constants_keys__["a" /* keys */].keyD:
                        this.player.changeRotation(false);
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__constants_keys__["a" /* keys */].keyW:
                        this.player.forward();
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__constants_keys__["a" /* keys */].keyS:
                        this.player.backward();
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__constants_keys__["a" /* keys */].spaceBar:
                        this.player.shoot();
                        break;
                    default:
                        break;
                }
            }
        }
    };
    return PlayerController;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/playerController.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerShape; });
var PlayerShape = /** @class */ (function () {
    function PlayerShape(size, color) {
        if (color === void 0) { color = 'red'; }
        this.size = size;
        this.color = color;
    }
    PlayerShape.prototype.draw = function (ctx, locationInfo) {
        this.shape = new Path2D();
        this.shape.moveTo(locationInfo.position.x, locationInfo.position.y);
        this.nextFirstPoint(locationInfo.position.x, locationInfo.position.y, locationInfo.rotation);
        this.nextSecondPoint(locationInfo.position.x, locationInfo.position.y, locationInfo.rotation);
        this.shape.lineTo(locationInfo.position.x, locationInfo.position.y);
        var hue = this.calculateHue(locationInfo.position.x, locationInfo.position.y, locationInfo.rotation);
        var color = 'rgb(' + hue[0] + ',' + hue[1] + ',' + hue[2] + ')';
        this.color = color;
        ctx.fillStyle = this.color;
        ctx.fill(this.shape);
    };
    PlayerShape.prototype.nextFirstPoint = function (currentX, currentY, rotation) {
        var x = currentX + Math.sin(rotation) * this.size;
        var y = currentY + Math.cos(rotation) * this.size;
        this.shape.lineTo(x, y);
    };
    PlayerShape.prototype.nextSecondPoint = function (currentX, currentY, rotation) {
        var x = currentX + Math.sin(rotation + Math.PI / 2) * this.size;
        var y = currentY + Math.cos(rotation + Math.PI / 2) * this.size;
        this.shape.lineTo(x, y);
    };
    PlayerShape.prototype.calculateHue = function (x, y, rotation) {
        var hue = [];
        hue[0] = Math.round(Math.abs(x / 2 % 255));
        hue[1] = Math.round(Math.abs(y / 2 % 255));
        hue[2] = Math.round(Math.abs(((rotation % (2 * Math.PI)) / (Math.PI * 2)) * 255));
        return hue;
    };
    return PlayerShape;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/playerShape.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Point; });
var Point = /** @class */ (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.move = function (vector) {
        this._x = this._x + vector.x;
        this._y = this._y + vector.y;
    };
    return Point;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/point.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bulletShape__ = __webpack_require__(465);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bullet; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bullet.prototype.setSpeed = function (speed) {
        var vx = Math.sin(this.locationInfo.rotation) * speed;
        var vy = Math.cos(this.locationInfo.rotation) * speed;
        this.velocity = new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* Vector */](vx, vy);
    };
    Bullet.prototype.setBulletRadius = function (getBulletRadius) {
        this.shape = new __WEBPACK_IMPORTED_MODULE_2__bulletShape__["a" /* BulletShape */](getBulletRadius);
    };
    Bullet.prototype.nextStep = function (context) {
        _super.prototype.nextStep.call(this, context);
        this.draw(context);
    };
    Bullet.prototype.draw = function (context) {
        this.shape.draw(context, this.locationInfo);
    };
    return Bullet;
}(__WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* GameObject */]));

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/bullet.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BulletShape; });
var BulletShape = /** @class */ (function () {
    function BulletShape(getBulletRadius, color) {
        if (color === void 0) { color = 'red'; }
        this.bulletRadius = getBulletRadius();
        this.color = color;
    }
    BulletShape.prototype.draw = function (ctx, locationInfo) {
        this.shape = new Path2D();
        this.shape.moveTo(locationInfo.position.x, locationInfo.position.y);
        this.shape = new Path2D();
        this.shape.arc(locationInfo.position.x, locationInfo.position.y, this.bulletRadius, 0, Math.PI * 2, true);
        this.shape.closePath();
        ctx.fillStyle = this.color;
        ctx.fill(this.shape);
    };
    return BulletShape;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/bulletShape.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__weapon__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullets_bullet__ = __webpack_require__(464);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NormalWeapon; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var NormalWeapon = /** @class */ (function (_super) {
    __extends(NormalWeapon, _super);
    function NormalWeapon(position) {
        var _this = _super.call(this, position) || this;
        _this.getBulletRadius = function () {
            var size = Math.random() * 20;
            return size;
        };
        _this.maxBullets = 1000;
        return _this;
    }
    NormalWeapon.prototype.shoot = function (locationInfo) {
        if (this.ownBullets.length < this.maxBullets && this.canShoot()) {
            var bullet = new __WEBPACK_IMPORTED_MODULE_1__bullets_bullet__["a" /* Bullet */]();
            bullet.locationInfo.rotation = locationInfo.rotation - 3 * Math.PI / 4;
            bullet.locationInfo.position.x = locationInfo.position.x;
            bullet.locationInfo.position.y = locationInfo.position.y;
            bullet.color = this.bulletColor;
            bullet.setSpeed(this.bulletSpeed);
            bullet.setBulletRadius(this.getBulletRadius);
            this.ownBullets.push(bullet);
            this.lastShootedAt = Date.now();
            return true;
        }
        return false;
    };
    return NormalWeapon;
}(__WEBPACK_IMPORTED_MODULE_0__weapon__["a" /* Weapon */]));

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/normalWeapon.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(200);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Weapon; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Weapon = /** @class */ (function (_super) {
    __extends(Weapon, _super);
    function Weapon(position) {
        var _this = _super.call(this) || this;
        _this.bulletColor = 'red';
        _this.bulletSpeed = 10;
        _this.maxBullets = 10;
        _this.getBulletRadius = function () { return 2; };
        _this.ownBullets = [];
        _this.fireRate = 1;
        return _this;
    }
    Weapon.prototype.canShoot = function () {
        var maxBulletLimitReached = this.ownBullets.length >= this.maxBullets;
        return !maxBulletLimitReached && !this.fireRateLimitReached();
    };
    Weapon.prototype.fireRateLimitReached = function () {
        var limitReached = false;
        if (this.lastShootedAt !== undefined) {
            var timeBeteweenShots = 1 / this.fireRate * 1000;
            if (timeBeteweenShots > Date.now() - this.lastShootedAt) {
                limitReached = true;
            }
        }
        return limitReached;
    };
    Weapon.prototype.nextStep = function (context) {
        for (var _i = 0, _a = this.ownBullets; _i < _a.length; _i++) {
            var bullet = _a[_i];
            bullet.nextStep(context);
        }
    };
    return Weapon;
}(__WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* GameObject */]));

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/weapon.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__normalWeapon__ = __webpack_require__(466);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeaponFactory; });

var WeaponFactory = /** @class */ (function () {
    function WeaponFactory() {
    }
    WeaponFactory.createWeapon = function (position) {
        return new __WEBPACK_IMPORTED_MODULE_0__normalWeapon__["a" /* NormalWeapon */](position);
    };
    return WeaponFactory;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/weaponFactory.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return width; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return height; });
var width = 700;
var height = 700;

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/canvasSize.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return keys; });
var keys = {
    keyA: 65,
    keyS: 83,
    keyD: 68,
    keyW: 87,
    spaceBar: 32
};
Object.freeze(keys);

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/keys.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_player__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_canvasSize__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_gameInstance__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_playerController__ = __webpack_require__(461);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameWrapperComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GameWrapperComponent = /** @class */ (function () {
    function GameWrapperComponent() {
        this.width = __WEBPACK_IMPORTED_MODULE_2__constants_canvasSize__["a" /* width */];
        this.height = __WEBPACK_IMPORTED_MODULE_2__constants_canvasSize__["b" /* height */];
        this.key = [];
    }
    GameWrapperComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        document.body.onmouseover = function () {
            _this.canvas.focus();
        };
        //document.addEventListener('keypress', (event) => this.keyListener(event));
        document.addEventListener('keyup', function (event) {
            _this.key[event.keyCode] = event.type == 'keydown';
        }, false);
        document.addEventListener('keydown', function (event) {
            _this.key[event.keyCode] = event.type == 'keydown';
        }, false);
        this.player1 = new __WEBPACK_IMPORTED_MODULE_1__classes_player__["a" /* Player */](1);
        this.reset();
        this.playerController = new __WEBPACK_IMPORTED_MODULE_4__classes_playerController__["a" /* PlayerController */](this.player1, this.key);
        this.gameInstance = new __WEBPACK_IMPORTED_MODULE_3__classes_gameInstance__["a" /* GameInstance */](__WEBPACK_IMPORTED_MODULE_2__constants_canvasSize__["a" /* width */], __WEBPACK_IMPORTED_MODULE_2__constants_canvasSize__["b" /* height */], this.ctx, this.playerController);
        this.gameInstance.insertPlayers([this.player1]);
        this.gameInstance.loop();
    };
    GameWrapperComponent.prototype.showMoreInfo = function () {
        this.showingMoreInfo = true;
    };
    GameWrapperComponent.prototype.showLessInfo = function () {
        this.showingMoreInfo = false;
    };
    GameWrapperComponent.prototype.reset = function () {
        this.player1.locationInfo.position.x = 200;
        this.player1.locationInfo.position.y = 200;
        this.player1.velocity.x = -1;
        this.player1.velocity.y = -1;
        this.player1.size = 100;
        this.player1.locationInfo.rotation = Math.PI;
        this.player1.drag = 0.01;
        this.player1.forwardThrottle = 1;
        this.player1.backwardThrottle = 0.5;
        this.player1.torque = 0.05;
        this.player1.color = 'rgb(255,0,255)';
        this.player1.initShape();
    };
    GameWrapperComponent.prototype.fullReset = function () {
        this.reset();
        clearTimeout(this.gameInstance.timeout);
        this.gameInstance.loop();
    };
    GameWrapperComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-game-wrapper',
            template: __webpack_require__(636),
            styles: [__webpack_require__(631)]
        }),
        __metadata("design:paramtypes", [])
    ], GameWrapperComponent);
    return GameWrapperComponent;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/game-wrapper.component.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_player__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_forcesColor__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_forcesColor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__classes_forcesColor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_gameConfig__ = __webpack_require__(203);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerForcesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlayerForcesComponent = /** @class */ (function () {
    function PlayerForcesComponent() {
        this.middle = [];
    }
    PlayerForcesComponent.prototype.ngOnInit = function () {
        if (!this.player)
            throw new Error("Player is required");
        this.middle[0] = this.width / 2;
        this.middle[1] = this.height / 2;
        if (!this.forceColors) {
            this.forceColors = {};
            this.forceColors.drag = 'red';
            this.forceColors.engineForce = 'black';
            this.forceColors.rollDrag = 'yellow';
        }
        this.canvas = document.getElementById("canvasForces");
        this.ctx = this.canvas.getContext('2d');
        this.loop();
    };
    PlayerForcesComponent.prototype.loop = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.lineWidth = 3;
        this.drawDragForce();
        this.drawRollDragForce();
        this.drawEngineForce();
        setTimeout(function () { return _this.loop(); }, __WEBPACK_IMPORTED_MODULE_3__constants_gameConfig__["a" /* frameRate */] / 1000);
    };
    PlayerForcesComponent.prototype.drawDragForce = function () {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.forceColors.drag;
        this.ctx.moveTo(this.middle[0], this.middle[1]);
        this.ctx.lineTo(this.middle[0] + this.player.dragForce.x * 100, this.middle[1] + this.player.dragForce.y * 100);
        this.ctx.stroke();
    };
    PlayerForcesComponent.prototype.drawRollDragForce = function () {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.forceColors.rollDrag;
        this.ctx.moveTo(this.middle[0], this.middle[1]);
        this.ctx.lineTo(this.middle[0] + this.player.rollingForce.x * 100, this.middle[1] + this.player.rollingForce.y * 100);
        this.ctx.stroke();
    };
    PlayerForcesComponent.prototype.drawEngineForce = function () {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.forceColors.engineForce;
        this.ctx.moveTo(this.middle[0], this.middle[1]);
        this.ctx.lineTo(this.middle[0] + this.player.engineForce.y * 100, this.middle[1] + this.player.engineForce.y * 100);
        this.ctx.stroke();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
        __metadata("design:type", Number)
    ], PlayerForcesComponent.prototype, "width", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
        __metadata("design:type", Number)
    ], PlayerForcesComponent.prototype, "height", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__classes_player__["a" /* Player */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__classes_player__["a" /* Player */]) === "function" && _a || Object)
    ], PlayerForcesComponent.prototype, "player", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__classes_forcesColor__["ForceColor"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__classes_forcesColor__["ForceColor"]) === "function" && _b || Object)
    ], PlayerForcesComponent.prototype, "forceColors", void 0);
    PlayerForcesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-player-forces',
            template: __webpack_require__(637),
            styles: [__webpack_require__(632)]
        }),
        __metadata("design:paramtypes", [])
    ], PlayerForcesComponent);
    return PlayerForcesComponent;
    var _a, _b;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/player-forces.component.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_player__ = __webpack_require__(201);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerInfoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PlayerInfoComponent = /** @class */ (function () {
    function PlayerInfoComponent() {
    }
    PlayerInfoComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__classes_player__["a" /* Player */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__classes_player__["a" /* Player */]) === "function" && _a || Object)
    ], PlayerInfoComponent.prototype, "player", void 0);
    PlayerInfoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-player-info',
            template: __webpack_require__(638),
            styles: [__webpack_require__(633)]
        }),
        __metadata("design:paramtypes", [])
    ], PlayerInfoComponent);
    return PlayerInfoComponent;
    var _a;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/player-info.component.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebSocketComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WebSocketComponent = /** @class */ (function () {
    function WebSocketComponent() {
        this.message = '';
        this.messages = [];
    }
    WebSocketComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.webSocket = new WebSocket('ws://127.0.0.1:1337');
        this.webSocket.onopen = function () {
            // connection is opened and ready to use
        };
        this.webSocket.onerror = function (error) {
            // an error occurred when sending/receiving data
        };
        this.webSocket.onmessage = function (message) {
            // try to decode json (I assume that each message
            // from server is json)
            try {
                var json = JSON.parse(message.data);
                _this.messages.push(json);
            }
            catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', message.data);
                return;
            }
            // handle incoming message
        };
    };
    WebSocketComponent.prototype.sendMessage = function () {
        this.webSocket.send(this.message);
        this.message = '';
    };
    WebSocketComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-web-socket',
            template: __webpack_require__(639),
            styles: [__webpack_require__(634)]
        }),
        __metadata("design:paramtypes", [])
    ], WebSocketComponent);
    return WebSocketComponent;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/web-socket.component.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/environment.js.map

/***/ }),

/***/ 630:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 631:
/***/ (function(module, exports) {

module.exports = ".component-wrapper {\n  overflow: hidden; }\n\n.game-wrapper {\n  position: relative;\n  padding-bottom: 2px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-pack: distribute;\n      justify-content: space-around; }\n\nh3, h2 {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14); }\n\nh2 {\n  text-justify: center;\n  text-align: center; }\n\n.actions {\n  margin-right: 5px;\n  margin-left: 5px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  height: auto;\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n  .actions h3 {\n    text-align: center;\n    margin-top: 2px;\n    margin-bottom: 2px; }\n  .actions button {\n    margin: 4px 4px;\n    padding: 1em 1em;\n    font-size: 20px;\n    border: none;\n    background-color: aquamarine;\n    transition: all 0.5s ease-in-out; }\n  .actions button:hover {\n    background-color: aqua;\n    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n  .actions button:active {\n    background-color: darkblue;\n    color: white; }\n\ncanvas {\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n\n.player-info-wrapper {\n  background-color: aquamarine;\n  position: absolute;\n  top: 0;\n  right: -500px;\n  width: 500px;\n  transition: all 1s; }\n  .player-info-wrapper .show-more {\n    position: absolute;\n    width: 50px;\n    height: 50px;\n    top: 20px;\n    right: 500px;\n    border-top-left-radius: 50%;\n    border-bottom-left-radius: 50%;\n    background-color: aquamarine; }\n\n.player-info-wrapper.player-info-visible {\n  right: 0;\n  z-index: 901; }\n\n.no-overlay {\n  opacity: 0; }\n\n.no-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: black;\n  z-index: -1;\n  transition: opacity 1s; }\n\n.no-overlay.overlay {\n  opacity: 0.5;\n  z-index: 900; }\n"

/***/ }),

/***/ 632:
/***/ (function(module, exports) {

module.exports = "canvas {\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  border-radius: 50%; }\n"

/***/ }),

/***/ 633:
/***/ (function(module, exports) {

module.exports = ":host {\n  margin-left: 5px;\n  margin-right: 5px; }\n\n.player-info-wrapper {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  padding-left: 5px; }\n\n.player-info-cell {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-line-pack: center;\n      align-content: center;\n  padding-top: 5px;\n  padding-bottom: 5px label;\n    padding-bottom-font-weight: bold; }\n\nh3 {\n  border-bottom: 1px solid black;\n  margin-top: 2px;\n  margin-bottom: 2px; }\n"

/***/ }),

/***/ 634:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 635:
/***/ (function(module, exports) {

module.exports = "\n<app-game-wrapper></app-game-wrapper>"

/***/ }),

/***/ 636:
/***/ (function(module, exports) {

module.exports = "<div class=\"component-wrapper\">\n    <h2>Game </h2>\n    <div class=\"game-wrapper\">\n        <div class=\"actions\">\n            <h3>Actions</h3>\n            <button (click)=\"fullReset()\">Reset</button>\n        </div>\n        <canvas [width]=\"width\" [height]=\"height\" id=\"canvas\"></canvas>\n        <div (mouseenter)=\"showMoreInfo()\" (mouseleave)=\"showLessInfo()\" class=\"player-info-wrapper\" [ngClass]=\"{'player-info-visible':showingMoreInfo}\">\n            <div class=\"show-more\"></div>\n            <app-player-info [player]=\"player1\"></app-player-info>\n        </div>\n        <app-player-forces width=\"100\" height=\"100\" [player] = \"player1\" ></app-player-forces>\n    </div>\n   \n</div>\n\n<div [ngClass]=\"{'overlay': showingMoreInfo}\" class=\"no-overlay\"></div>"

/***/ }),

/***/ 637:
/***/ (function(module, exports) {

module.exports = "<canvas id=\"canvasForces\" [width]=\"width\" [height]=\"height\">\n\n</canvas>"

/***/ }),

/***/ 638:
/***/ (function(module, exports) {

module.exports = "<div class=\"player-info-wrapper\">\n  <h3>Properties</h3>\n  <div class=\"player-info-cell\">\n    <label>Posicion X:</label> {{player.x | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Posicion Y:</label> {{player.y | number }}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Velocidad x:</label> {{player.vx | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Velocidad y:</label> {{player.vy | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>RollingDragForce X:</label> {{player.rollingForce[0] | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>RollingDragForce Y:</label> {{player.rollingForce[1] | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Aceleracion:</label>\n    <input [(ngModel)]=\"player.forwardThrottle\" type=\"range\" min=\"0\" max=\"15\" step=\"0.1\"> {{player.forwardThrottle | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Deceleracion:</label>\n    <input [(ngModel)]=\"player.backwardThrottle\" type=\"range\" min=\"0\" max=\"5\" step=\"0.1\"> {{player.backwardThrottle | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Torque:</label>\n    <input [(ngModel)]=\"player.torque\" type=\"range\" min=\"0\" max=\"0.1\" step=\"0.001\"> {{player.torque | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Drag:</label>\n    <input [(ngModel)]=\"player.drag\" type=\"range\" min=\"0\" max=\"1\" step=\"0.001\"> {{player.drag | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Roll drag:</label>\n    <input [(ngModel)]=\"player.rollDrag\" type=\"range\" min=\"0\" max=\"1\" step=\"0.001\"> {{player.rollDrag | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label> Mass:</label>\n    <input [(ngModel)]=\"player.mass\" type=\"range\" min=\"1\" max=\"500\" step=\"1\"> {{player.mass | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label> Rotation drag:</label>\n    <input [(ngModel)]=\"player.rotationDrag\" type=\"range\" min=\"0\" max=\"3\" step=\"0.01\"> {{player.rotationDrag | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label> Rotation roll drag:</label>\n    <input [(ngModel)]=\"player.rotationRollDrag\" type=\"range\" min=\"0\" max=\"3\" step=\"0.01\"> {{player.rotationRollDrag | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Bullets:</label>\n    <input [(ngModel)]=\"player.maxBullets\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"> {{player.maxBullets | number}}\n  </div>\n</div>"

/***/ }),

/***/ 639:
/***/ (function(module, exports) {

module.exports = "<p>\n  web-socket works!\n\n  <input [(ngModel)] = \"message\">\n  <button (click) = \"sendMessage()\">Enviar</button>\n</p>\n\n<p *ngFor=\"let message of messages\">{{message}}</p>\n"

/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(349);


/***/ })

},[654]);
//# sourceMappingURL=main.bundle.map