/**
 * Jesus figure
 * 
 * @constructor
 * @extends Entity
 */
function Jesus() {

    var x = 100;
    var y = 100;

    Entity.call(this, "image_game_Jesus", x, y, 30, 40);
    this.makeAnimations();
    
}

Jesus.prototype = Object.create(Entity.prototype);
Jesus.prototype.constructor = Jesus;

/**
 * Makes standrad animation for Jesus
 *
 * @returns {undefined}
 */
Jesus.prototype.makeAnimations = function() {

   this.animation.create("holymacaroni", [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 8, false);
   this.animation.gotoAndPlay("holymacaroni");

};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Jesus.prototype.update = function(step) {
    Entity.prototype.update.call(this, step);
    var current = this.animation.current;

    if (current.name == "holymacaroni" && current.frameIndex == (current.frames.length - 1)) {
        this.parent.removeChild(this);
    }
};


