/**
 * The boss enemy
 * 
 * @constructor
 * @extends Entity
 */
function BossWeed() {
    this.x = 173 + Math.random() * (220 - 173);
    this.y = -32;
    this.hp = 5;

    Entity.call(this, "image_game_bigweed", this.x, this.y, 32, 32);
    this.animation.create("walk", [0, 1, 2, 3, 4], 6, true);

    this.canHit = true;

    this.hitbox.set(2, 2, 28, 28);

}

BossWeed.prototype = Object.create(Entity.prototype);
BossWeed.prototype.constructor = BossWeed;

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
BossWeed.prototype.update = function (step) {
    Entity.prototype.update.call(this, step);

    var centerX = 400 / 2;
    var centerY = 225 / 2;

    var dx = centerX - this.x;
    var dy = centerY - this.y;

    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
        this.x += (dx / dist) * (step / 200);
        this.y += (dy / dist) * (step / 200);
    }
    this.animation.gotoAndPlay("walk");

};




