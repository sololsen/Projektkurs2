/**
 * The waterdropplet used when watering the flower
 * 
 * @constructor
 * @extends Entity
 */
function Waterdroplet() {

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


    Entity.call(this, "image_game_waterdroplet", x, y, 20, 20);
    this.makeAnimations();
    this.point = 10;

    this.hitbox.set(5, 8, 8, 8);
    
}

Waterdroplet.prototype = Object.create(Entity.prototype);
Waterdroplet.prototype.constructor = Waterdroplet;


/**
 * Idle animation for waterdropplet
 *
 * @returns {undefined} 
 */
Waterdroplet.prototype.makeAnimations = function() {

   this.animation.create("idle", [0, 1, 2, 1, 0], 6, true);
   this.animation.gotoAndPlay("idle");

};


/**
 * Animation for when water is dropped in the waterzone of the flower
 *
 * @returns {undefined} 
 */
Waterdroplet.prototype.dropWater = function() {

    this.animation.create("drop", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 27, 25, 26, 27], 30, false);
    this.animation.gotoAndPlay("drop");

};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Waterdroplet.prototype.update = function(step) {
    Entity.prototype.update.call(this, step);
    var current = this.animation.current;

    if (current.name == "drop" && current.frameIndex == (current.frames.length - 1)) {
        this.parent.removeChild(this);
    }
};