/**
 * The flower the fairies need to protect
 * 
 * @constructor
 * @extends Entity
 */
function Powerup(picture) {

    this.screenWidth = this.application.screen.width;
    this.screenHeight = this.application.screen.height;

    var x;
    var y;
    do {
        x = Math.random() * this.screenWidth;
        y = Math.random() * this.screenHeight;
    } while (y < 20 || x >= 170 && x <= 220 && y >= 78 && y <= 132);


    Entity.call(this, picture, x, y, 20, 20);
    this.makeAnimations();

    this.hitbox.set(5, 8, 8, 8);

}

Powerup.prototype = Object.create(Entity.prototype);
Powerup.prototype.constructor = Powerup;

/**
 * Makes standrad animation for the powerups
 *
 * @returns {undefined}
 */
Powerup.prototype.makeAnimations = function () {

    this.animation.create("idle", [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0], 6, true);
    this.animation.gotoAndPlay("idle");

};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Powerup.prototype.update = function (step) {
    Entity.prototype.update.call(this, step);

};