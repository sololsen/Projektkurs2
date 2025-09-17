/**
 * Player two - Sol
 * 
 * 
 * @constructor
 * @extends Fairy
 * @param {string} image - image for the choosen fairy
 */
function Sol(image) {
    Fairy.call(this, image, 120, 120);
    this.emitY = this.y + this.height * 0.3;
    this.elasticity = 10;

    /**
     * Emitter for glitter behind the entity
     */
    this.emitter = new rune.particle.Emitter(this.centerX, this.emitY, 3, 5, {
        particles: [Glitter],
        capacity: 150,
        accelerationY: 0.00005,
        accelerationX: 0.00005,
        maxRotation: 10,
        dragY: 0.2,
        maxVelocityX: 0.06,
        minVelocityX: -0.06,
        maxVelocityY: 0.15,
        maxLifespan: 1000
    });

    /**
    * Tracks collected waterdropplets
    * @type {number}
    */
    this.waterCollection = 0;
}

Sol.prototype = Object.create(Fairy.prototype);
Sol.prototype.constructor = Sol;


/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Sol.prototype.update = function (step) {
    Fairy.prototype.update.call(this, step);
    this.emitter.emit(2);

    if (this.isStuck) {
        this.velocity.x = 0;
        this.velocity.y = 0;
        return;
    }

     if (this.gameOverStop) {
        this.velocity.x = 0;
        this.velocity.y = 0;
        return;
    }
    
    var gamepad = this.gamepads.get(1);
    var stick = gamepad.stickLeft;

    if (gamepad.pressed(6)) {
        this.velocity.x = 0;
        this.velocity.y = 0;
    } else {
        this.velocity.x = stick.x * this.speed;
        this.velocity.y = stick.y * this.speed;
    }


    this.x += this.velocity.x;
    this.y += this.velocity.y;



    this.emitter.x = this.centerX;
    this.emitter.y = this.y + this.height * 0.3;

    if (stick.x !== 0 || stick.y !== 0) {
        this.lastVX = stick.x;
        this.lastVY = stick.y;
        if (stick.y < 0) {
            this.animation.gotoAndPlay("backwards");
        } else {
            this.animation.gotoAndPlay("walk");
        }

        this.flippedX = stick.x > 0;
    } else {
        this.animation.gotoAndPlay("idle");
    }
};


/**
 * Fires shot in the last movements direction
 *
 * @returns {LightBall} - The shot
 */
Sol.prototype.shoot = function () {

    var dir;

    dir = new rune.geom.Vector2D(this.lastVX, this.lastVY).normalize();

    const ball = new LightBall(
        (this.x - 4) + this.width / 2,
        (this.y - 4) + this.height / 2,
        dir
    );

    return ball;
};


/**
 * Fires a powerup attack in 8 directions
 *
 * @returns {LightBall[]} Array with 8 lightballs
 */
Sol.prototype.shootPowerUp = function () {
    var directions = [
        new rune.geom.Vector2D(1, 0),
        new rune.geom.Vector2D(1, 1),
        new rune.geom.Vector2D(0, 1),
        new rune.geom.Vector2D(-1, 1),
        new rune.geom.Vector2D(-1, 0),
        new rune.geom.Vector2D(-1, -1),
        new rune.geom.Vector2D(0, -1),
        new rune.geom.Vector2D(1, -1)
    ];

    var balls = [];

    for (var i = 0; i < directions.length; i++) {
        var dir = directions[i].normalize();

        var ball = new LightBall(
            this.x + this.width / 2,
            this.y + this.height / 2,
            dir
        );


        balls.push(ball);
    }

    return balls;
};

/**
 * Increases water collection counter
 *
 * @param {number} amount - Amount of water collected
 * @returns {undefined}
 */
Sol.prototype.addDrop = function (amount) {

    this.waterCollection += amount;

}