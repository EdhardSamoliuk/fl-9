'use strict';

function assign(target) {
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
    }

    let toObj = Object(target);
    for (let i = 1; i < arguments.length; i++) {
        let nextSource = arguments[i];

        if (nextSource) {
            for (let key in nextSource) {
                //nextSource.hasOwnProperty() --- can be overwritten
                if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
                    toObj[key] = nextSource[key];
                }
            }
        }
    }

    return toObj;
}

function Bot(arg) {
    this.name = arg.name;
    this.speed = this.defaultSpeed = arg.speed;
    this.x = arg.x;
    this.y = arg.y;
}

Bot.prototype.getName = function () {
    return this.name;
}

Bot.prototype.setName = function (name) {
    this.name = name;
}

Bot.prototype.getSpeed = function () {
    return this.speed;
}

Bot.prototype.setSpeed = function (speed) {
    this.speed = speed;
}

Bot.prototype.getDefaultSpeed = function () {
    return this.defaultSpeed;
}

Bot.prototype.getCoordinates = function () {
    return {
        x: this.x,
        y: this.y
    };
}

Bot.prototype.SetCoordinates = function (coordinates) {
    this.x = coordinates.x;
    this.y = coordinates.y;
}

Bot.prototype.move = function (direction) {
    switch (direction) {
        case 'up':
            this.y += this.getSpeed();
            break;
        case 'down':
            this.y -= this.getSpeed();
            break;
        case 'left':
            this.x -= this.getSpeed();
            break;
        case 'right ':
            this.x += this.getSpeed();
            break;
        default:
            console.log('Wrong direction');
    }
}

Bot.prototype.showPosition = function () {
    console.log(`I am ${this.constructor.name} '${this.name}'.\
    I am located at ${this.getCoordinates().x}:${this.getCoordinates().y}.`);
}

function Racebot(arg) {
    Bot.call(this, arg);
    this.previousMove = '';
}

Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;

Racebot.prototype.move = function (direction) {
    this.setSpeed(this.previousMove === direction ? this.getSpeed() + 1 : this.getDefaultSpeed());
    Bot.prototype.move.call(this, direction);
    this.previousMove = direction;
}

function Speedbot(arg) {
    Bot.call(this, arg);
}

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;

Speedbot.prototype.prepareEngine = function () {
    this.setSpeed(this.getSpeed() + 2);
}

Speedbot.prototype.move = function (direction) {
    Bot.prototype.move.call(this, direction);
    this.setSpeed(this.getSpeed() === this.getDefaultSpeed() ? this.getSpeed() : this.getSpeed() - 1);
}
