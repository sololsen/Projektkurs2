/**
 * The flower the fairies need to protect
 * 
 * @constructor
 * @extends Entity
 */
function Watercan(x, y) {

    Entity.call(this, "image_game_watercan", x, y, 12, 10);


    this.makeAnimations();
    
}

Watercan.prototype = Object.create(Entity.prototype);
Watercan.prototype.constructor = Watercan;

/**
 * Makes standard animation for the watercan
 *
 * @returns {undefined}
 */
Watercan.prototype.makeAnimations = function() {

   this.animation.create("water", [0, 1, 2, 3, 4], 6, true);
   this.animation.gotoAndPlay("water");
};

/**
 * Updates picture based on how many dropplets the player has
 *
 * @returns {undefined}
 */
Watercan.prototype.updatePicture = function(frame) {
    
    this.animation.current.gotoAndStop(frame); 
    
};

