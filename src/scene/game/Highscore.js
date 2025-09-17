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
 * Scene for the highscore board
 */
pixiepower.scene.Highscore = function (highscores) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    this.highscores = highscores;
    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

pixiepower.scene.Highscore.prototype = Object.create(rune.scene.Scene.prototype);
pixiepower.scene.Highscore.prototype.constructor = pixiepower.scene.Highscore;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
pixiepower.scene.Highscore.prototype.init = function () {
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

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_highscore");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);


    this.initHighscore();

};


/**
 * Initializes all the highscores and names
 *
 * @returns {undefined}
 */
pixiepower.scene.Highscore.prototype.initHighscore = function () {
  
    for (var i = 0; i < 8; i++) {
        var entry = this.highscores.get(i, 0);

        if (entry) {
            var row = new rune.text.BitmapField(`${i + 1}. ${entry.name} ${entry.score}`, "image_alfafont");
            row.y = 50 + i * 15;
            row.x = 50;
            row.autoSize = true;
            this.stage.addChild(row);
        }
    }


    for (var i = 0; i < 8; i++) {
        var entry = this.highscores.get(i, 1);

        if (entry) {
            var row = new rune.text.BitmapField(`${i + 1}. ${entry.name} ${entry.score}`, "image_alfafont");
            row.y = 50 + i * 15;
            row.x = 205;
            row.autoSize = true;
            this.stage.addChild(row);
        }
    }


};



/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
pixiepower.scene.Highscore.prototype.update = function (step) {

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
pixiepower.scene.Highscore.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};