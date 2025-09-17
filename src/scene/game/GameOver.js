//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 * @param {number} score - The highscores
 * @param {object} highscores - Object with all the names and highscores
 *
 * @class
 * @classdesc
 * 
 * Scene that starts when highscore is reached
 */
pixiepower.scene.GameOver = function (score, highscores) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    this.score = score;
    this.highscores = highscores;

    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

pixiepower.scene.GameOver.prototype = Object.create(rune.scene.Scene.prototype);
pixiepower.scene.GameOver.prototype.constructor = pixiepower.scene.GameOver;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOver.prototype.init = function () {
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


    var text = new rune.text.BitmapField("HIGHSCORE", "image_font_highscore");

    text.autoSize = true;
    text.center = this.application.screen.center;
    text.color = "#FFFFFF";
    text.y = 40;
    this.stage.addChild(text);

    this.initKeyboard();


};

/**
 * Initializes the keyboard for name for the highscore
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOver.prototype.initKeyboard = function () {
    this.selected = [];
    this.enteredLetters = [];

    this.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " OK"];

    var startX = 50;

    for (var i = 0; i < this.alphabet.length; i++) {
        var letter = new rune.text.BitmapField(this.alphabet[i], "image_alfafont");
        letter.y = 150;
        letter.x = startX + i * 10;
        letter.autoSize = true;
        this.stage.addChild(letter);
        this.selected.push(letter);
    }

    this.selectedI = 0;
    this.highscoreName = [];
    this.updateHighlight();
};

/**
 * Updates the highligt of the selected choice when lever is moved
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOver.prototype.updateHighlight = function () {
    for (var i = 0; i < this.selected.length; i++) {
        if (i == this.selectedI) {
            this.selected[i].backgroundColor = "#FFC0CB";
        } else {
            this.selected[i].backgroundColor = "";
        }
    }
};

/**
 * Handles input for selecting letters to add, delete and comfirm the name
 *
 * @param {string} letter - The choosen letter
 * @returns {undefined}
 */
pixiepower.scene.GameOver.prototype.addLetterGraphic = function (letter) {
    var startX = 140;
    var letterGraphic = new rune.text.BitmapField(letter, "image_alfafont");
    letterGraphic.y = 100;
    letterGraphic.x = startX + (this.enteredLetters.length * 10);
    letterGraphic.autoSize = true;
    this.stage.addChild(letterGraphic);
    this.enteredLetters.push(letterGraphic);
};


/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOver.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    var gamepad = this.gamepads.get(0);

    if (gamepad.stickLeftJustRight) {
        this.selectedI++;
        if (this.selectedI >= this.selected.length) {
            this.selectedI = 0;
        }
        this.updateHighlight();
    } else if (gamepad.stickLeftJustLeft) {
        this.selectedI--;
        if (this.selectedI < 0) {
            this.selectedI = this.selected.length - 1;
        }
        this.updateHighlight();
    }

    if (gamepad.justPressed(0)) {
        if (this.selectedI == this.selected.length - 1) {
            this.pressOkButton();
        } else {
            var chosenLetter = this.alphabet[this.selectedI];
            if (this.highscoreName.length < 10) {
                this.highscoreName.push(chosenLetter);
                this.addLetterGraphic(chosenLetter);
            }
        }
    }

    if (gamepad.justPressed(1)) {
        if (this.highscoreName.length > 0) {
            this.highscoreName.pop();

            var lastLetterGraphic = this.enteredLetters.pop();
            this.stage.removeChild(lastLetterGraphic);

        }
    }
};


/**
 * Loads the highscore board when ok is pressed
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOver.prototype.pressOkButton = function () {
    var name = this.highscoreName.join("");

    if (this.gamepads.numGamepads == 1) { console.log(this.highscores); this.highscores.send(this.score, name, 0); } else if (this.gamepads.numGamepads == 2) { this.highscores.send(this.score, name, 1); }





    this.cameras.getCameraAt(0).fade.out(250, function () {
                this.application.scenes.load([
                    new pixiepower.scene.Highscore(this.highscores)
                ]);
            }, this);
            



};


/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOver.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};