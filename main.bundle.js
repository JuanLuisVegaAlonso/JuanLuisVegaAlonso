webpackJsonp([1,4],{

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playerShape__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__physics_wall_collision_detector__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_canvasSize__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__playerController__ = __webpack_require__(308);
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
    function Player(id, gameObjectDependencies, weapon) {
        var _this = _super.call(this, gameObjectDependencies) || this;
        _this.id = id;
        _this.weapon = weapon;
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
        this.physicsController.nextLocationInfo();
        this.handleWallColisions();
        this.weapon.nextStep(context);
        this.draw(context, this.physicsController.locationInfo);
        this.physicsController.resetEngineForce();
        this.physicsController.resetTurning();
    };
    Player.prototype.handleWallColisions = function () {
        var collisions = this.wallCollisionDetector.getCollitions();
        for (var _i = 0, collisions_1 = collisions; _i < collisions_1.length; _i++) {
            var collision = collisions_1[_i];
            switch (collision) {
                case __WEBPACK_IMPORTED_MODULE_2__physics_wall_collision_detector__["a" /* Wall */].LEFT:
                    this.physicsController.velocity.x = 0;
                    this.physicsController.locationInfo.position.x = 0;
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__physics_wall_collision_detector__["a" /* Wall */].TOP:
                    this.physicsController.velocity.y = 0;
                    this.physicsController.locationInfo.position.y = 0;
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__physics_wall_collision_detector__["a" /* Wall */].RIGHT:
                    this.physicsController.velocity.x = 0;
                    // TODO add gameSize
                    this.physicsController.locationInfo.position.x = __WEBPACK_IMPORTED_MODULE_3__constants_canvasSize__["a" /* width */];
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__physics_wall_collision_detector__["a" /* Wall */].BOT:
                    this.physicsController.velocity.y = 0;
                    this.physicsController.locationInfo.position.y = __WEBPACK_IMPORTED_MODULE_3__constants_canvasSize__["a" /* width */];
                    break;
            }
        }
    };
    Player.prototype.evaluateUserInput = function (actions) {
        for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
            var action = actions_1[_i];
            switch (action) {
                case __WEBPACK_IMPORTED_MODULE_4__playerController__["a" /* Action */].FORWARD:
                    this.forward();
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__playerController__["a" /* Action */].BACKWARD:
                    this.backward();
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__playerController__["a" /* Action */].TURN_RIGHT:
                    this.changeRotation(true);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__playerController__["a" /* Action */].TURN_LEFT:
                    this.changeRotation(false);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__playerController__["a" /* Action */].SHOOT:
                    this.shoot();
                    break;
            }
        }
    };
    Player.prototype.draw = function (context, locationInfo) {
        this.shape.draw(context, locationInfo);
    };
    Player.prototype.changeRotation = function (clockWise) {
        this.physicsController.changeRotation(clockWise);
    };
    Player.prototype.forward = function () {
        this.physicsController.forward();
    };
    Player.prototype.backward = function () {
        this.physicsController.backward();
    };
    Player.prototype.shoot = function () {
        return this.weapon.shoot(this.physicsController.locationInfo);
    };
    return Player;
}(__WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* GameObject */]));

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/player.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bulletShape__ = __webpack_require__(469);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BulletEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Bullet; });
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



var BulletEvent;
(function (BulletEvent) {
    BulletEvent[BulletEvent["WALL_HIT"] = 0] = "WALL_HIT";
})(BulletEvent || (BulletEvent = {}));
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(gameObjectDependencies) {
        var _this = _super.call(this, gameObjectDependencies) || this;
        _this._subscribers = [];
        return _this;
    }
    Bullet.prototype.subscribe = function (subscription) {
        this._subscribers.push(subscription);
    };
    Bullet.prototype.notify = function (event) {
        for (var _i = 0, _a = this._subscribers; _i < _a.length; _i++) {
            var subscirber = _a[_i];
            subscirber(event, this);
        }
    };
    Bullet.prototype.setSpeed = function (speed) {
        var vx = Math.sin(this.physicsController.locationInfo.rotation) * speed;
        var vy = Math.cos(this.physicsController.locationInfo.rotation) * speed;
        this.physicsController.velocity = new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* Vector */](vx, vy);
    };
    Bullet.prototype.setBulletRadius = function (getBulletRadius) {
        this.shape = new __WEBPACK_IMPORTED_MODULE_2__bulletShape__["a" /* BulletShape */](getBulletRadius);
    };
    Bullet.prototype.nextStep = function (context) {
        this.physicsController.nextLocationInfo();
        if (this.wallCollisionDetector.getCollitions().length > 0) {
            this.notify(BulletEvent.WALL_HIT);
        }
        this.draw(context, this.physicsController.locationInfo);
    };
    Bullet.prototype.draw = function (context, locationInfo) {
        this.shape.draw(context, locationInfo);
    };
    return Bullet;
}(__WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* GameObject */]));

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/bullet.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return width; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return height; });
var width = 700;
var height = 700;

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/canvasSize.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return frameRate; });
var frameRate = 1000 / 60;

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/gameConfig.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__point__ = __webpack_require__(309);
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

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_canvasSize__ = __webpack_require__(203);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Wall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WallCollisionDetector; });

var Wall;
(function (Wall) {
    Wall[Wall["TOP"] = 0] = "TOP";
    Wall[Wall["LEFT"] = 1] = "LEFT";
    Wall[Wall["RIGHT"] = 2] = "RIGHT";
    Wall[Wall["BOT"] = 3] = "BOT";
})(Wall || (Wall = {}));
var WallCollisionDetector = /** @class */ (function () {
    function WallCollisionDetector(physicsController) {
        this.physicsController = physicsController;
    }
    WallCollisionDetector.prototype.getCollitions = function () {
        var collisions = [];
        if (this.physicsController.locationInfo.position.x + this.physicsController.velocity.x <= 0) {
            collisions.push(Wall.LEFT);
        }
        if (this.physicsController.locationInfo.position.y + this.physicsController.velocity.y <= 0) {
            collisions.push(Wall.TOP);
        }
        if (this.physicsController.locationInfo.position.x + this.physicsController.velocity.x >= __WEBPACK_IMPORTED_MODULE_0__constants_canvasSize__["a" /* width */]) {
            collisions.push(Wall.RIGHT);
        }
        if (this.physicsController.locationInfo.position.y + this.physicsController.velocity.y >= __WEBPACK_IMPORTED_MODULE_0__constants_canvasSize__["b" /* height */]) {
            collisions.push(Wall.BOT);
        }
        return collisions;
    };
    return WallCollisionDetector;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/wall-collision-detector.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_keys__ = __webpack_require__(473);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PlayerController; });

var Action;
(function (Action) {
    Action[Action["FORWARD"] = 0] = "FORWARD";
    Action[Action["BACKWARD"] = 1] = "BACKWARD";
    Action[Action["TURN_LEFT"] = 2] = "TURN_LEFT";
    Action[Action["TURN_RIGHT"] = 3] = "TURN_RIGHT";
    Action[Action["SHOOT"] = 4] = "SHOOT";
})(Action || (Action = {}));
var PlayerController = /** @class */ (function () {
    function PlayerController(key) {
        this.key = key;
    }
    PlayerController.prototype.evaluateInput = function () {
        var length = this.key.length;
        var pressedActions = [];
        for (var i = 0; i < length; i++) {
            if (this.key[i]) {
                switch (i) {
                    case __WEBPACK_IMPORTED_MODULE_0__constants_keys__["a" /* keys */].keyA:
                        // this.player.changeRotation(true);
                        pressedActions.push(Action.TURN_RIGHT);
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__constants_keys__["a" /* keys */].keyD:
                        // this.player.changeRotation(false);
                        pressedActions.push(Action.TURN_LEFT);
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__constants_keys__["a" /* keys */].keyW:
                        //this.player.forward();
                        pressedActions.push(Action.FORWARD);
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__constants_keys__["a" /* keys */].keyS:
                        //this.player.backward();
                        pressedActions.push(Action.BACKWARD);
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__constants_keys__["a" /* keys */].spaceBar:
                        //this.player.shoot();
                        pressedActions.push(Action.SHOOT);
                        break;
                    default:
                        break;
                }
            }
        }
        return pressedActions;
    };
    return PlayerController;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/playerController.js.map

/***/ }),

/***/ 309:
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

/***/ 310:
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

/***/ 353:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 353;


/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(463);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/main.js.map

/***/ }),

/***/ 462:
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
            template: __webpack_require__(638),
            styles: [__webpack_require__(633)]
        })
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/app.component.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__web_socket_web_socket_component__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_wrapper_game_wrapper_component__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__player_info_player_info_component__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__player_forces_player_forces_component__ = __webpack_require__(475);
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

/***/ 464:
/***/ (function(module, exports) {

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/forcesColor.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ships_player__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_gameConfig__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weapons_bullets_bullet__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GameObject__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__weapons_bullets_bulletFactory__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__weapons_weaponFactory__ = __webpack_require__(472);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameInstance; });






var GameInstance = /** @class */ (function () {
    function GameInstance(width, height, ctx, playerController) {
        var _this = this;
        this.height = height;
        this.width = width;
        this.ctx = ctx;
        this.playerController = playerController;
        this._bulletFactory = new __WEBPACK_IMPORTED_MODULE_4__weapons_bullets_bulletFactory__["a" /* BulletFactory */](this, function (bulletEvent, bullet) { return _this.bulletCollisionedOnWall(bulletEvent, bullet); });
        this._weaponFactory = new __WEBPACK_IMPORTED_MODULE_5__weapons_weaponFactory__["a" /* WeaponFactory */](this, this._bulletFactory);
        this.resetGameInstance();
    }
    GameInstance.prototype.loop = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        // TODO change to allow multiple players
        if (this.players && this.players.length > 0) {
            this.players[0].evaluateUserInput(this.playerController.evaluateInput());
        }
        this.updateAllGameObjects();
        this.timeout = setTimeout(function () { return _this.loop(); }, __WEBPACK_IMPORTED_MODULE_1__constants_gameConfig__["a" /* frameRate */]);
    };
    GameInstance.prototype.updateAllGameObjects = function () {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var gameObject = _a[_i];
            gameObject.nextStep(this.ctx);
        }
    };
    GameInstance.prototype.bulletCollisionedOnWall = function (bulletEvent, bullet) {
        switch (bulletEvent) {
            case __WEBPACK_IMPORTED_MODULE_2__weapons_bullets_bullet__["a" /* BulletEvent */].WALL_HIT:
                this.removeGameObject(bullet);
                break;
        }
    };
    GameInstance.prototype.resetPlayer = function () {
        if (this.players && this.players.length > 0) {
            var player1 = this.players[0];
            player1.physicsController.locationInfo.position.x = 200;
            player1.physicsController.locationInfo.position.y = 200;
            player1.physicsController.velocity.x = -1;
            player1.physicsController.velocity.y = -1;
            player1.size = 100;
            player1.physicsController.locationInfo.rotation = Math.PI;
            player1.physicsController.drag = 0.01;
            player1.physicsController.forwardThrottle = 1;
            player1.physicsController.backwardThrottle = 0.5;
            player1.physicsController.torque = 0.05;
            player1.color = 'rgb(255,0,255)';
            player1.initShape();
        }
    };
    GameInstance.prototype.resetGameInstance = function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.gameObjects = [];
        this.players = [];
    };
    // Public API
    GameInstance.prototype.addGameObject = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    GameInstance.prototype.removeGameObject = function (gameObject) {
        var gameObjectPosition = this.gameObjects.indexOf(gameObject);
        if (gameObjectPosition !== -1) {
            this.gameObjects.splice(gameObjectPosition, 1);
        }
    };
    GameInstance.prototype.startGame = function () {
        this.resetGameInstance();
        var player1 = new __WEBPACK_IMPORTED_MODULE_0__ships_player__["a" /* Player */](1, __WEBPACK_IMPORTED_MODULE_3__GameObject__["a" /* GameObject */].initGameObject(), this._weaponFactory.createWeapon());
        this.players.push(player1);
        this.addGameObject(player1);
        this.resetPlayer();
        this.loop();
    };
    Object.defineProperty(GameInstance.prototype, "player1", {
        get: function () {
            if (this.players && this.players.length > 0) {
                return this.players[0];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return GameInstance;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/gameInstance.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_gameConfig__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__locationInfo__ = __webpack_require__(306);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhysicsController; });



var PhysicsController = /** @class */ (function () {
    function PhysicsController(locationInfo) {
        // From gameObject.ts
        this.velocity = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](0, 0);
        this.acceleration = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](0, 0);
        this.mass = 10;
        this.drag = 0;
        this.rollDrag = 0.1;
        // From Player.ts
        this.locationInfo = new __WEBPACK_IMPORTED_MODULE_2__locationInfo__["a" /* LocationInfo */]();
        this.forwardThrottle = 0;
        this.backwardThrottle = 0;
        this.torque = 0;
        this.dragForce = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](0, 0);
        this.rollingForce = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](0, 0);
        this.engineForce = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](0, 0);
        this.rotationSpeed = 0;
        this.rotationAcceleration = 0;
        this.externalTorque = 0;
        this.rotationDrag = 0.1;
        this.rotationRollingDrag = 0.3;
        this.rotationDragForce = 0;
        this.rotationRollingDragForce = 0;
        this.locationInfo = locationInfo;
    }
    PhysicsController.prototype.calculateDragForce = function () {
        var forceDirection = this.velocity
            .getNormalized()
            .escalarMultiply(Math.pow(this.velocity.getModule(), 2))
            .escalarMultiply(-this.drag);
        this.dragForce.changeDirection(forceDirection.x, forceDirection.y);
    };
    PhysicsController.prototype.calculateRollingForce = function () {
        this.rollingForce.escalarMultiply(-this.rollDrag);
    };
    PhysicsController.prototype.calculateAcceleration = function () {
        this.acceleration.changeDirection(0, 0);
        this.acceleration
            .add(this.engineForce)
            .add(this.dragForce)
            .add(this.rollingForce)
            .escalarDivide(this.mass);
    };
    PhysicsController.prototype.calculateSpeed = function () {
        this.velocity.add(this.acceleration.escalarMultiply(__WEBPACK_IMPORTED_MODULE_1__constants_gameConfig__["a" /* frameRate */]));
    };
    PhysicsController.prototype.calculateRotationAcceleration = function () {
        var rotationForce = (this.externalTorque * (this.clockwise ? 1 : -1)) + this.rotationDragForce + this.rotationRollingDragForce;
        this.rotationAcceleration = rotationForce / this.mass;
    };
    PhysicsController.prototype.calculateRotationSpeed = function () {
        this.rotationSpeed = this.rotationSpeed + this.rotationAcceleration * __WEBPACK_IMPORTED_MODULE_1__constants_gameConfig__["a" /* frameRate */];
    };
    PhysicsController.prototype.calculateRotationDrag = function () {
        this.rotationDragForce = -this.rotationDrag * Math.pow(this.rotationSpeed, 2) * Math.sign(this.rotationSpeed);
    };
    PhysicsController.prototype.calculateRotationRollingDrag = function () {
        this.rotationRollingDragForce = -this.rotationRollingDrag * this.rotationSpeed;
    };
    PhysicsController.prototype.resetEngineForce = function () {
        this.engineForce = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](0, 0);
    };
    PhysicsController.prototype.resetTurning = function () {
        this.externalTorque = 0;
    };
    PhysicsController.prototype.forward = function () {
        var forceX = Math.sin(this.locationInfo.rotation - Math.PI * 3 / 4) * this.forwardThrottle;
        var forceY = Math.cos(this.locationInfo.rotation - Math.PI * 3 / 4) * this.forwardThrottle;
        this.engineForce.changeDirection(forceX, forceY);
    };
    PhysicsController.prototype.backward = function () {
        var forceX = -Math.sin(this.locationInfo.rotation - Math.PI * 3 / 4) * this.backwardThrottle;
        var forceY = -Math.cos(this.locationInfo.rotation - Math.PI * 3 / 4) * this.backwardThrottle;
        this.engineForce.changeDirection(forceX, forceY);
    };
    PhysicsController.prototype.nextLocationInfo = function () {
        this.calculateDragForce();
        this.calculateRollingForce();
        this.calculateAcceleration();
        this.calculateSpeed();
        this.calculateRotationDrag();
        this.calculateRotationRollingDrag();
        this.calculateRotationAcceleration();
        this.calculateRotationSpeed();
        this.locationInfo.rotation += this.rotationSpeed;
        this.locationInfo.position.move(this.velocity);
        return this.locationInfo;
    };
    PhysicsController.prototype.changeRotation = function (clockWise) {
        this.externalTorque = this.torque;
        this.clockwise = clockWise;
    };
    return PhysicsController;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/physics-controller.js.map

/***/ }),

/***/ 467:
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

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bullet__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GameObject__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BulletFactory; });


var BulletFactory = /** @class */ (function () {
    function BulletFactory(world, onWallColission) {
        this._world = world;
        this._onWallColission = onWallColission;
        console.dir(this._onWallColission);
    }
    BulletFactory.prototype.createBullet = function (onWallColission) {
        var bullet = new __WEBPACK_IMPORTED_MODULE_0__bullet__["b" /* Bullet */](__WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* GameObject */].initGameObject());
        this._world.addGameObject(bullet);
        return bullet;
    };
    return BulletFactory;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/bulletFactory.js.map

/***/ }),

/***/ 469:
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
        this.shape.arc(locationInfo.position.x, locationInfo.position.y, this.bulletRadius, 0, Math.PI * 2, true);
        this.shape.closePath();
        ctx.fillStyle = this.color;
        ctx.fill(this.shape);
    };
    return BulletShape;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/bulletShape.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__weapon__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullets_bullet__ = __webpack_require__(202);
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
    function NormalWeapon(gameObjectDependencies, bulletFactory) {
        var _this = _super.call(this, gameObjectDependencies, bulletFactory) || this;
        _this.getBulletRadius = function () {
            return Math.random() * 20;
        };
        _this.maxBullets = 1000;
        return _this;
    }
    NormalWeapon.prototype.shoot = function (locationInfo) {
        var _this = this;
        if (this.ownBullets.length < this.maxBullets && this.canShoot()) {
            var bullet = this._bulletFactory.createBullet(function (bullet) { return _this.deleteBullet(bullet); });
            bullet.subscribe(function (bulletEvent, bullet) { return _this.bulletListener(bulletEvent, bullet); });
            bullet.physicsController.locationInfo.rotation = locationInfo.rotation - 3 * Math.PI / 4;
            bullet.physicsController.locationInfo.position = new __WEBPACK_IMPORTED_MODULE_1__point__["a" /* Point */](locationInfo.position.x, locationInfo.position.y);
            bullet.color = this.bulletColor;
            bullet.setSpeed(this.bulletSpeed);
            bullet.setBulletRadius(this.getBulletRadius);
            this.ownBullets.push(bullet);
            this.lastShootedAt = Date.now();
            return true;
        }
        return false;
    };
    NormalWeapon.prototype.bulletListener = function (bulletEvent, bullet) {
        switch (bulletEvent) {
            case __WEBPACK_IMPORTED_MODULE_2__bullets_bullet__["a" /* BulletEvent */].WALL_HIT:
                this.deleteBullet(bullet);
                break;
        }
    };
    NormalWeapon.prototype.deleteBullet = function (bullet) {
        var bulletPosition = this.ownBullets.indexOf(bullet);
        if (bulletPosition !== -1) {
            this.ownBullets.splice(bulletPosition, 1);
        }
    };
    return NormalWeapon;
}(__WEBPACK_IMPORTED_MODULE_0__weapon__["a" /* Weapon */]));

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/normalWeapon.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(70);
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
    function Weapon(gameObjectDependencies, bulletFactory) {
        var _this = _super.call(this, gameObjectDependencies) || this;
        _this.bulletColor = 'red';
        _this.bulletSpeed = 10;
        _this.maxBullets = 10;
        _this.getBulletRadius = function () { return 2; };
        _this.ownBullets = [];
        _this.fireRate = 100;
        _this._bulletFactory = bulletFactory;
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

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__normalWeapon__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GameObject__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeaponFactory; });


var WeaponFactory = /** @class */ (function () {
    function WeaponFactory(world, bulletFactory) {
        this._world = world;
        this._bulletFactory = bulletFactory;
    }
    WeaponFactory.prototype.createWeapon = function () {
        var weapon = new __WEBPACK_IMPORTED_MODULE_0__normalWeapon__["a" /* NormalWeapon */](__WEBPACK_IMPORTED_MODULE_1__GameObject__["a" /* GameObject */].initGameObject(), this._bulletFactory);
        this._world.addGameObject(weapon);
        return weapon;
    };
    return WeaponFactory;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/weaponFactory.js.map

/***/ }),

/***/ 473:
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

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_canvasSize__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_gameInstance__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_playerController__ = __webpack_require__(308);
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
        this.width = __WEBPACK_IMPORTED_MODULE_1__constants_canvasSize__["a" /* width */];
        this.height = __WEBPACK_IMPORTED_MODULE_1__constants_canvasSize__["b" /* height */];
        this.key = [];
    }
    GameWrapperComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.canvas = document.getElementById("canvas");
        var ctx = this.canvas.getContext('2d');
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
        var playerController = new __WEBPACK_IMPORTED_MODULE_3__classes_playerController__["b" /* PlayerController */](this.key);
        this.gameInstance = new __WEBPACK_IMPORTED_MODULE_2__classes_gameInstance__["a" /* GameInstance */](__WEBPACK_IMPORTED_MODULE_1__constants_canvasSize__["a" /* width */], __WEBPACK_IMPORTED_MODULE_1__constants_canvasSize__["b" /* height */], ctx, playerController);
        this.gameInstance.startGame();
    };
    GameWrapperComponent.prototype.showMoreInfo = function () {
        this.showingMoreInfo = true;
    };
    GameWrapperComponent.prototype.showLessInfo = function () {
        this.showingMoreInfo = false;
    };
    GameWrapperComponent.prototype.fullReset = function () {
        this.gameInstance.startGame();
    };
    Object.defineProperty(GameWrapperComponent.prototype, "player1", {
        get: function () {
            return this.gameInstance.player1;
        },
        enumerable: true,
        configurable: true
    });
    GameWrapperComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-game-wrapper',
            template: __webpack_require__(639),
            styles: [__webpack_require__(634)]
        }),
        __metadata("design:paramtypes", [])
    ], GameWrapperComponent);
    return GameWrapperComponent;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/game-wrapper.component.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_ships_player__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_forcesColor__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_forcesColor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__classes_forcesColor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_gameConfig__ = __webpack_require__(204);
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
        this.ctx.lineTo(this.middle[0] + this.player.physicsController.dragForce.x * 100, this.middle[1] + this.player.physicsController.dragForce.y * 100);
        this.ctx.stroke();
    };
    PlayerForcesComponent.prototype.drawRollDragForce = function () {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.forceColors.rollDrag;
        this.ctx.moveTo(this.middle[0], this.middle[1]);
        this.ctx.lineTo(this.middle[0] + this.player.physicsController.rollingForce.x * 100, this.middle[1] + this.player.physicsController.rollingForce.y * 100);
        this.ctx.stroke();
    };
    PlayerForcesComponent.prototype.drawEngineForce = function () {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.forceColors.engineForce;
        this.ctx.moveTo(this.middle[0], this.middle[1]);
        this.ctx.lineTo(this.middle[0] + this.player.physicsController.engineForce.y * 100, this.middle[1] + this.player.physicsController.engineForce.y * 100);
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
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__classes_ships_player__["a" /* Player */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__classes_ships_player__["a" /* Player */]) === "function" && _a || Object)
    ], PlayerForcesComponent.prototype, "player", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__classes_forcesColor__["ForceColor"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__classes_forcesColor__["ForceColor"]) === "function" && _b || Object)
    ], PlayerForcesComponent.prototype, "forceColors", void 0);
    PlayerForcesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-player-forces',
            template: __webpack_require__(640),
            styles: [__webpack_require__(635)]
        }),
        __metadata("design:paramtypes", [])
    ], PlayerForcesComponent);
    return PlayerForcesComponent;
    var _a, _b;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/player-forces.component.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_ships_player__ = __webpack_require__(201);
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
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__classes_ships_player__["a" /* Player */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__classes_ships_player__["a" /* Player */]) === "function" && _a || Object)
    ], PlayerInfoComponent.prototype, "player", void 0);
    PlayerInfoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-player-info',
            template: __webpack_require__(641),
            styles: [__webpack_require__(636)]
        }),
        __metadata("design:paramtypes", [])
    ], PlayerInfoComponent);
    return PlayerInfoComponent;
    var _a;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/player-info.component.js.map

/***/ }),

/***/ 477:
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
            template: __webpack_require__(642),
            styles: [__webpack_require__(637)]
        }),
        __metadata("design:paramtypes", [])
    ], WebSocketComponent);
    return WebSocketComponent;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/web-socket.component.js.map

/***/ }),

/***/ 478:
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

/***/ 633:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 634:
/***/ (function(module, exports) {

module.exports = ".component-wrapper {\n  overflow: hidden; }\n\n.game-wrapper {\n  position: relative;\n  padding-bottom: 2px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-pack: distribute;\n      justify-content: space-around; }\n\nh3, h2 {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14); }\n\nh2 {\n  text-justify: center;\n  text-align: center; }\n\n.actions {\n  margin-right: 5px;\n  margin-left: 5px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  height: auto;\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n  .actions h3 {\n    text-align: center;\n    margin-top: 2px;\n    margin-bottom: 2px; }\n  .actions button {\n    margin: 4px 4px;\n    padding: 1em 1em;\n    font-size: 20px;\n    border: none;\n    background-color: aquamarine;\n    transition: all 0.5s ease-in-out; }\n  .actions button:hover {\n    background-color: aqua;\n    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n  .actions button:active {\n    background-color: darkblue;\n    color: white; }\n\ncanvas {\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n\n.player-info-wrapper {\n  background-color: aquamarine;\n  position: absolute;\n  top: 0;\n  right: -500px;\n  width: 500px;\n  transition: all 1s; }\n  .player-info-wrapper .show-more {\n    position: absolute;\n    width: 50px;\n    height: 50px;\n    top: 20px;\n    right: 500px;\n    border-top-left-radius: 50%;\n    border-bottom-left-radius: 50%;\n    background-color: aquamarine; }\n\n.player-info-wrapper.player-info-visible {\n  right: 0;\n  z-index: 901; }\n\n.no-overlay {\n  opacity: 0; }\n\n.no-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: black;\n  z-index: -1;\n  transition: opacity 1s; }\n\n.no-overlay.overlay {\n  opacity: 0.5;\n  z-index: 900; }\n"

/***/ }),

/***/ 635:
/***/ (function(module, exports) {

module.exports = "canvas {\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  border-radius: 50%; }\n"

/***/ }),

/***/ 636:
/***/ (function(module, exports) {

module.exports = ":host {\n  margin-left: 5px;\n  margin-right: 5px; }\n\n.player-info-wrapper {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  padding-left: 5px; }\n\n.player-info-cell {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-line-pack: center;\n      align-content: center;\n  padding-top: 5px;\n  padding-bottom: 5px label;\n    padding-bottom-font-weight: bold; }\n\nh3 {\n  border-bottom: 1px solid black;\n  margin-top: 2px;\n  margin-bottom: 2px; }\n"

/***/ }),

/***/ 637:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 638:
/***/ (function(module, exports) {

module.exports = "\n<app-game-wrapper></app-game-wrapper>"

/***/ }),

/***/ 639:
/***/ (function(module, exports) {

module.exports = "<div class=\"component-wrapper\">\n    <h2>Game </h2>\n    <div class=\"game-wrapper\">\n        <div class=\"actions\">\n            <h3>Actions</h3>\n            <button (click)=\"fullReset()\">Reset</button>\n        </div>\n        <canvas [width]=\"width\" [height]=\"height\" id=\"canvas\"></canvas>\n        <div (mouseenter)=\"showMoreInfo()\" (mouseleave)=\"showLessInfo()\" class=\"player-info-wrapper\" [ngClass]=\"{'player-info-visible':showingMoreInfo}\">\n            <div class=\"show-more\"></div>\n            <app-player-info [player]=\"player1\"></app-player-info>\n        </div>\n        <!--<app-player-forces width=\"100\" height=\"100\" [player] = \"player1\" ></app-player-forces>-->\n    </div>\n   \n</div>\n\n<div [ngClass]=\"{'overlay': showingMoreInfo}\" class=\"no-overlay\"></div>"

/***/ }),

/***/ 640:
/***/ (function(module, exports) {

module.exports = "<canvas id=\"canvasForces\" [width]=\"width\" [height]=\"height\">\n\n</canvas>"

/***/ }),

/***/ 641:
/***/ (function(module, exports) {

module.exports = "<div class=\"player-info-wrapper\" *ngIf=\"player\">\n  <h3>Properties</h3>\n  <!--<div class=\"player-info-cell\">\n    <label>Posicion X:</label> {{player.x | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Posicion Y:</label> {{player.y | number }}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Velocidad x:</label> {{player.vx | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Velocidad y:</label> {{player.vy | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>RollingDragForce X:</label> {{player.rollingForce[0] | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>RollingDragForce Y:</label> {{player.rollingForce[1] | number}}\n  </div>-->\n  <div class=\"player-info-cell\">\n    <label>Aceleracion:</label>\n    <input [(ngModel)]=\"player?.physicsController.forwardThrottle\" type=\"range\" min=\"0\" max=\"15\" step=\"0.1\"> {{player.physicsController.forwardThrottle | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Deceleracion:</label>\n    <input [(ngModel)]=\"player?.physicsController.backwardThrottle\" type=\"range\" min=\"0\" max=\"5\" step=\"0.1\"> {{player.physicsController.backwardThrottle | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Torque:</label>\n    <input [(ngModel)]=\"player?.physicsController.torque\" type=\"range\" min=\"0\" max=\"0.1\" step=\"0.001\"> {{player.physicsController.torque | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Drag:</label>\n    <input [(ngModel)]=\"player?.physicsController.drag\" type=\"range\" min=\"0\" max=\"1\" step=\"0.001\"> {{player.physicsController.drag | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Roll drag:</label>\n    <input [(ngModel)]=\"player?.physicsController.rollDrag\" type=\"range\" min=\"0\" max=\"1\" step=\"0.001\"> {{player.physicsController.rollDrag | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label> Mass:</label>\n    <input [(ngModel)]=\"player?.physicsController.mass\" type=\"range\" min=\"1\" max=\"500\" step=\"1\"> {{player.physicsController.mass | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label> Rotation drag:</label>\n    <input [(ngModel)]=\"player?.physicsController.rotationDrag\" type=\"range\" min=\"0\" max=\"3\" step=\"0.01\"> {{player.physicsController.rotationDrag | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label> Rotation roll drag:</label>\n    <input [(ngModel)]=\"player.physicsController.rotationRollDrag\" type=\"range\" min=\"0\" max=\"3\" step=\"0.01\"> {{player.physicsController.rotationRollDrag | number}}\n  </div>\n  <div class=\"player-info-cell\">\n    <label>Bullets:</label>\n    <input [(ngModel)]=\"player?.weapon.maxBullets\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"> {{player.weapon.maxBullets | number}}\n  </div>\n</div>"

/***/ }),

/***/ 642:
/***/ (function(module, exports) {

module.exports = "<p>\n  web-socket works!\n\n  <input [(ngModel)] = \"message\">\n  <button (click) = \"sendMessage()\">Enviar</button>\n</p>\n\n<p *ngFor=\"let message of messages\">{{message}}</p>\n"

/***/ }),

/***/ 657:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(354);


/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__locationInfo__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__physics_physics_controller__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__physics_wall_collision_detector__ = __webpack_require__(307);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameObject; });



var GameObject = /** @class */ (function () {
    function GameObject(gameObjectDependencies) {
        this.physicsController = gameObjectDependencies.physicsController;
        this.wallCollisionDetector = gameObjectDependencies.wallCollisionDetector;
    }
    GameObject.initGameObject = function () {
        var locationInfo = new __WEBPACK_IMPORTED_MODULE_0__locationInfo__["a" /* LocationInfo */]();
        var physicsController = new __WEBPACK_IMPORTED_MODULE_1__physics_physics_controller__["a" /* PhysicsController */](locationInfo);
        var wallCollisionDetector = new __WEBPACK_IMPORTED_MODULE_2__physics_wall_collision_detector__["b" /* WallCollisionDetector */](physicsController);
        return { physicsController: physicsController, wallCollisionDetector: wallCollisionDetector };
    };
    GameObject.prototype.getShape = function () {
        return this.shape;
    };
    return GameObject;
}());

//# sourceMappingURL=E:/nodejs/StarShipSooterFrontend/src/GameObject.js.map

/***/ })

},[657]);
//# sourceMappingURL=main.bundle.map