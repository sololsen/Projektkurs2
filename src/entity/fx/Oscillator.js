/**
 * Generates a wavy effect used for the mushroom 
 * 
 * @constructor
 * @param {number} speed - Speed change over time
 */
Oscillator = function(speed) {

  var frame = 0;

  /**
   * Returns sinus based on time and x-position
   * 
   * @param {number} x - To change the ocillator
   * @returns {number} A number beetween 1 and -1 that varies over time
   */
  this.current = function(x) {
    frame += 0.003 * speed;
    return Math.sin(frame + x * speed * 10);
  };
}