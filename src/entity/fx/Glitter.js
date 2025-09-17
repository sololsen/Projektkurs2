/**
 * Glitter used for effects
 * 
 * @constructor
 * @extends rune.particle.Particle
 */
function Glitter() {
    rune.particle.Particle.call(this, 0, 0, 2, 2, "image_sparkle");
}

Glitter.prototype = Object.create(rune.particle.Particle.prototype);
Glitter.prototype.constructor = Glitter;

/**
 * Init function
 * @extends rune.particle.Particle
 */
Glitter.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};


/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Glitter.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step);
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
Glitter.prototype.dispose = function() {
    rune.particle.Particle.prototype.dispose.call(this);
};
