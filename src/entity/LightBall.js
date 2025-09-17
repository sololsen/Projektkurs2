/**
 * The flower the fairies need to protect
 * 
 * @constructor
 * @extends Entity
 */
function LightBall (x, y, direction) {
    Entity.call(this, "image_game_lightball", x, y, 8, 8);

    this.velocity.x = direction.x * 3;
    this.velocity.y = direction.y * 3;
    this.hitbox.set(0, 0, 8, 8);
    this.isDead = false;
    
};

LightBall.prototype = Object.create(Entity.prototype);
LightBall.prototype.constructor = LightBall;

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
LightBall.prototype.update = function () {

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (
        this.x < -this.width || this.x > 400 + this.width ||
        this.y < -this.height || this.y > 225 + this.height
    )  { 
        this.isDead = true;
    }

};
