//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.camera.Camera
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
Camera = function() {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {boolean}
     * @default false
     */
    this.wavy = false;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.camera.Camera.call(this, 0, 0, this.application.screen.width, this.application.screen.height);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Camera.prototype = Object.create(rune.camera.Camera.prototype);
Camera.prototype.constructor = Camera;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Camera.prototype.init = function() {
    rune.camera.Camera.prototype.init.call(this);
    
    var w = this.m_viewport.width;
    var h = this.m_viewport.height;
    
    this.o1 = new Oscillator(0.05);
    this.o2 = new Oscillator(0.03);
    this.o3 = new Oscillator(0.06);
    this.o4 = new Oscillator(0.08);
    this.o5 = new Oscillator(0.04);
    this.o6 = new Oscillator(0.067);
    
    this.x0 = 0;
    this.x1 = w * 0.25;
    this.x2 = w * 0.5;
    this.x3 = w * 0.75;
    this.x4 = w;
    this.y0 = 0;
    this.y1 = h * 0.25;
    this.y2 = h * 0.5;
    this.y3 = h * 0.75;
    this.y4 = h;
    this.sw0 = this.x1;
    this.sw1 = this.x2 - this.x1;
    this.sw2 = this.x3 - this.x2;
    this.sw3 = this.x4 - this.x3;
    this.sh0 = this.y1;
    this.sh1 = this.y2 - this.y1;
    this.sh2 = this.y3 - this.y2;
    this.sh3 = this.y4 - this.y3;
};

/**
 * ...
 *
 * @returns {undefined}
 */
Camera.prototype.render = function() {
    this.m_renderBackgroundColor();
    this.m_renderMapBackBuffer();
    this.m_renderInput();
    this.m_renderMapFrontBuffer();
    this.m_renderChildren();
    this.m_renderGraphics();
    this.m_renderWaves();
    this.m_renderTint();
    this.m_renderFlash();
    this.m_renderFade();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Camera.prototype.m_renderWaves = function() {
    if (!this.wavy) return;
    
    var w = this.m_viewport.width;
    var h = this.m_viewport.height;
    
    for (var y = 0; y < h; y++) {
        var lx1 = this.x1 + this.o1.current(y * 0.2) * 8; // 8
        var lx2 = this.x2 + this.o2.current(y * 0.2) * 5; // 5
        var lx3 = this.x3 + this.o3.current(y * 0.2) * 8; // 8
        var w0  = lx1;
        var w1  = lx2 - lx1;
        var w2  = lx3 - lx2;
        var w3  = this.x4 - lx3;
        
        this.m_canvas.context.drawImage(this.m_canvas.element, this.x0, y, this.sw0, 1, 0        , y, w0      , 1);
        this.m_canvas.context.drawImage(this.m_canvas.element, this.x1, y, this.sw1, 1, lx1 - 0.5, y, w1 + 0.5, 1);
        this.m_canvas.context.drawImage(this.m_canvas.element, this.x2, y, this.sw2, 1, lx2 - 0.5, y, w2 + 0.5, 1);
        this.m_canvas.context.drawImage(this.m_canvas.element, this.x3, y, this.sw3, 1, lx3 - 0.5, y, w3 + 0.5, 1);
    }
};

