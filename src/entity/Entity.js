/**
 * Base class for all entitys
 * 
 * @constructor
 * @extends rune.display.Sprite
 */
function Entity(name, x, y, width, height) {

    rune.display.Sprite.call(this, x, y, width, height, name);

    this.acceleration = 1;
    this.speed = 1;

}

Entity.prototype = Object.create(rune.display.Sprite.prototype);
Entity.prototype.constructor = Entity;
