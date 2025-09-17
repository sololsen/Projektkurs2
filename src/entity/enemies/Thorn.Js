/**
 * Thorn enemy, can make a fairy be stuck
 * 
 * @constructor
 * @extends Entity
 */
function Thorn() {

    this.screenWidth = this.application.screen.width;
    this.screenHeight = this.application.screen.height;

    var x;
    var y;
    /**
     * Random spawn but avoids on the flower and close to top
     */
    do {
        x = Math.random() * this.screenWidth;
        y = Math.random() * this.screenHeight;
    } while (y < 20 || x >= 170 && x <= 220 && y >= 78 && y <= 132);

    Entity.call(this, "image_game_thorns", x, y, 26, 25);
    this.makeAnimations();

    this.hitbox.set(5, 10, 9, 11);

    /**
     * Emitter for glitter behind the entity
     */
    this.emitY = this.y + this.height * 0.3;
    this.emitter = new rune.particle.Emitter(this.centerX, this.emitY, 6, 8, {
        particles: [Glitter],
        capacity: 30,
        accelerationY: 0.00005,
        accelerationX: 0.00005,
        maxRotation: 10,
        dragY: 0.2,
        maxVelocityX: 0.06,
        minVelocityX: -0.06,
        maxVelocityY: 0.15,
        maxLifespan: 800
    });
    this.addChild(this.emitter);

}

Thorn.prototype = Object.create(Entity.prototype);
Thorn.prototype.constructor = Thorn;


/**
 * Growing animation
 *
 * @returns {undefined}
 */
Thorn.prototype.makeAnimations = function () {

    this.animation.create("grow", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 5, false);
    this.animation.gotoAndPlay("grow");

};


/**
 * Plays when growing animation is done
 *
 * @returns {undefined}
 */
Thorn.prototype.attackMode = function () {

    this.animation.create("idle", [22, 23], 2, true);
    this.animation.gotoAndPlay("idle");
}

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Thorn.prototype.update = function (step) {
    Entity.prototype.update.call(this, step);

    var current = this.animation.current;

    if (current.name == "grow" && current.frameIndex == (current.frames.length - 1)) {
        this.attackMode();
    }
};


/**
 * Plays when an fairy is stuck
 *
 * @returns {undefined}
 */
Thorn.prototype.fairyStuck = function () {

    this.animation.create("stuck", [24, 25, 26, 27, 28], 3, true);
    this.animation.gotoAndPlay("stuck");

};