/**
 * Class for all the fairies
 * 
 * @constructor
 * @extends Entity
 */
function Fairy(name, x, y) {
    Entity.call(this, name, x, y, 20, 20);
    
    this.hitbox.set(5, 5, 10, 10);
    this.isStuck = false;
    this.gameOverStop = false;
    this.makeAnimations(); 
   
}

Fairy.prototype = Object.create(Entity.prototype);
Fairy.prototype.constructor = Fairy;

/**
 * Diffrent animations for fairies
 *
 * @returns {undefined}
 */
Fairy.prototype.makeAnimations = function() {
    this.animation.create("walk", [0, 1, 2, 3, 4, 3, 2, 1, 0], 6, true);
    this.animation.create("idle", [0, 1, 2, 3, 2, 1, 0], 6, true);
    this.animation.create("backwards", [5, 6, 7, 8, 7, 6, 5], 6, true);
};

