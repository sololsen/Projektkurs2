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
 * The credits scene
 */
pixiepower.scene.Credits = function () {

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

pixiepower.scene.Credits.prototype = Object.create(rune.scene.Scene.prototype);
pixiepower.scene.Credits.prototype.constructor = pixiepower.scene.Credits;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
pixiepower.scene.Credits.prototype.init = function () {
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

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_credits_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);


    this.initFairies();

    this.text = new rune.text.BitmapField("this game was made by", "image_font_testnew");

    this.text.autoSize = true;
    this.text.center = this.application.screen.center;
    this.text.y = 50;

    this.text.color = "#FFFFFF";
    this.stage.addChild(this.text);

    this.copyright = new rune.text.BitmapField("copyright elevenlabs pixabay soundsnap uppbeat", "image_font_testsmall");

    this.copyright.autoSize = true;
    this.copyright.center = this.application.screen.center;
    this.copyright.y = 215;

    this.copyright.color = "#FFFFFF";
    this.stage.addChild(this.copyright);

};


/**
 * Initializes our fairies and our names
 *
 * @returns {undefined}
 */
pixiepower.scene.Credits.prototype.initFairies = function () {


    this.sol = new Entity("image_credits_sol", 230, 120, 45, 70);
    this.filippa = new Entity("image_credits_filippa", 120, 120, 45, 70);

    this.fairies = new rune.display.DisplayGroup(this.stage);
    this.fairies.addMember(this.sol);
    this.fairies.addMember(this.filippa);



    /**
     * Standard animation for the credits fairies
     */
    this.fairies.forEachMember(function (fairy) {
        fairy.animation.create("idle", [0, 1, 2, 3, 2, 1, 0], 6, true);
        fairy.animation.gotoAndPlay("idle");
    })

    var filippaText = new rune.text.BitmapField("FILIPPA DAGERHED", "image_alfafont");

    filippaText.color = "#FFFFFF";
    filippaText.x = this.filippa.x + (this.filippa.width - filippaText.width) / 2;
    filippaText.y = this.filippa.y + this.filippa.height;
    filippaText.autoSize = true;
    this.stage.addChild(filippaText);

    var solText = new rune.text.BitmapField("SOL OLSEN", "image_alfafont");

    solText.color = "#FFFFFF";
    solText.x = this.sol.x + (this.sol.width - solText.width) / 18;
    solText.y = this.sol.y + this.sol.height;
    solText.autoSize = true;
    this.stage.addChild(solText);


};



/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
pixiepower.scene.Credits.prototype.update = function (step) {

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
pixiepower.scene.Credits.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};