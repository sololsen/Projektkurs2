//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene 
 *
 * @class
 * @classdesc
 * 
 * The rules and directions for the controll
 */
pixiepower.scene.Controls = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

pixiepower.scene.Controls.prototype = Object.create(rune.scene.Scene.prototype);
pixiepower.scene.Controls.prototype.constructor = pixiepower.scene.Controls;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
pixiepower.scene.Controls.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    /**
    * Camera fade in to the scene
    */
    var cam = this.cameras.getCameraAt(0);
    cam.fade.color = new rune.color.Color24(0, 0, 0);
    cam.fade.opacity = 1;
    cam.fade.in(250);

    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_controls_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);

    /**
     * Board that displays rules 
     */
    this.board = new rune.display.Graphic(260, 30, 130, 180, "image_controls_board");
    this.board.autoSize = true;
    bgContainer.addChild(this.board);

    this.text = new rune.text.BitmapField("CONTROLS", "image_alfafont");

    this.text.autoSize = true;
    this.text.center = this.application.screen.center;
    this.text.y = 20;

    this.text.color = "#FFFFFF";
    this.stage.addChild(this.text);

    this.initControls();

};


/**
 * Displays control instructions
 *
 * @returns {undefined}
 */
pixiepower.scene.Controls.prototype.initControls = function () {

    /**
     * Graphic for the controll
     */
    this.control = new Controll();

    this.stage.addChild(this.control);

    var desc = new rune.text.BitmapField("shoot", "image_font_testsmall");
    desc.y = 118;
    desc.x = 202;
    this.stage.addChild(desc);


    var drop = new rune.text.BitmapField("drop water", "image_font_testsmall");
    drop.y = 76;
    drop.x = 180;
    this.stage.addChild(drop);

    var stop = new rune.text.BitmapField("stand still", "image_font_testsmall");
    stop.y = 76;
    stop.x = 5;
    stop.color = "#FFFFFF";
    this.stage.addChild(stop);

    var move = new rune.text.BitmapField("move/aim", "image_font_testsmall");
    move.y = 114;
    move.x = 5;
    move.color = "#FFFFFF";
    this.stage.addChild(move);


    var avoid = new rune.text.BitmapField("AVOID & SHOOT", "image_alfafont");
    avoid.y = 65;
    avoid.x = 273;
    avoid.autoSize = true;
    avoid.color = "#FFFFFF";
    this.stage.addChild(avoid);


    var collect = new rune.text.BitmapField("COLLECT", "image_alfafont");
    collect.y = 135;
    collect.x = 297;
    collect.autoSize = true;
    collect.color = "#FFFFFF";
    this.stage.addChild(collect);

};



/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
pixiepower.scene.Controls.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);

    var gamepad = this.gamepads.get(0);

    if (gamepad.justPressed(1)) {
        this.cameras.getCameraAt(0).fade.out(250, function () {
            this.application.scenes.load([
                new pixiepower.scene.Start()
            ]);
        }, this);

    }

};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
pixiepower.scene.Controls.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};