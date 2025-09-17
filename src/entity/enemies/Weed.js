/**
 * Standard weed enemy
 * 
 * @constructor
 * @extends Entity
 */
function Weed(x, y) {
    var canvasWidth = 400;
    var canvasHeight = 225;
    this.hp = 2;

 
    /**
     * If no cordinates a random location is set
     */
    if (x === undefined || y === undefined) {
        var spawnEdge = Math.floor(Math.random() * 4); 

        switch (spawnEdge) {
            case 0: 
                x = 173 + Math.random() * (220 - 173);
                y = -16;
                break;
            case 1: 
                x = canvasWidth + 16;
                y = 75 + Math.random() * (canvasHeight - 75);
                break;
            case 2: 
                x = Math.random() * canvasWidth;
                y = canvasHeight + 16;
                break;
            case 3: 
                x = -16;
                y = 85 + Math.random() * (canvasHeight - 75);
                break;
        }
    }

   
    Entity.call(this, "image_game_weedenemy", x, y, 16, 16);
    this.immovable = true;
    this.x = x;
    this.y = y;

    this.animation.create("walk", [0, 1, 2, 3, 4, 5], 6, true);

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

    this.canHit = true;
    this.hitbox.set(2, 2, 10, 10);
}

Weed.prototype = Object.create(Entity.prototype);
Weed.prototype.constructor = Weed;

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Weed.prototype.update = function (step) {
    Entity.prototype.update.call(this, step);
    this.emitter.x = this.centerX;
    this.emitter.y = this.y + this.height * 0.3;
    var centerX = 400 / 2;
    var centerY = 225 / 2;

    var dx = centerX - this.x;
    var dy = centerY - this.y;

    var dist = rune.util.Math.distance(this.x, this.y, 190, 105);

    if (dist > 18) {
        this.x += (dx / dist) * (step / 70);
        this.y += (dy / dist) * (step / 70);
    }
    this.animation.gotoAndPlay("walk");

};









