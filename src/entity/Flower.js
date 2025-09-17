/**
 * The flower the fairies need to protect
 * 
 * @constructor
 * @extends Entity
 */
function Flower() {

    Entity.call(this, "image_game_flower", 185, 90, 30, 40);

    /**
     * Flower's current life bar goes from 0–100
     * @type {number}
     */
    this.flowerLifeBar = 100;

    this.immovable = true;
    this.makeAnimations();
    this.hitbox.set(-1, 8, 31, 35);

    /**
     * If the flower dies, used to trigger an animation
     * @type {boolean}
     */
    this.isDead = false;
    
}

Flower.prototype = Object.create(Entity.prototype);
Flower.prototype.constructor = Flower;

/**
 * Makes standard animation for the flower
 *
 * @returns {undefined}
 */
Flower.prototype.makeAnimations = function() {

   this.animation.create("wilting", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 6, true);
   this.animation.gotoAndPlay("wilting");
};


/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Flower.prototype.update = function(step) {

    Entity.prototype.update.call(this, step);

    if (!this.isDead) {
    var totalFrames = 10;
    var percent = (0, this.flowerLifeBar / 100);
    var frame = Math.floor((1 - percent) * (totalFrames - 1));

    this.animation.current.gotoAndStop(frame); 
    }
    
};

/**
 * Decreases the flower's life by a certain amount
 * 
 * @param {number} amount - Amount of damage
 */
Flower.prototype.flowerDamage = function(amount) {
    
    this.flowerLifeBar -= amount;

    if (this.flowerLifeBar < 0) {
        this.flowerLifeBar = 0;
    }
   
}

/**
 * Increases the flower's life by a certain amount
 * 
 * @param {number} amount - Amount to heal
 */
Flower.prototype.flowerHeal = function(amount) {
    
    this.flowerLifeBar += amount;
    
    if (this.flowerLifeBar > 100) {
        this.flowerLifeBar = 100;
    }
}

/**
 * Animation for when the flower dies
 *
 * @returns {undefined}
 */
Flower.prototype.dyingFlower = function() {
    this.isDead = true;
   this.animation.create("dying", [9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ,19], 2, true);
   this.animation.gotoAndPlay("dying");
};