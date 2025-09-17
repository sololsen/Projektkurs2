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
 * Game scene.
 */
pixiepower.scene.ChoosePlayer = function (highscores) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    this.highscores = highscores;
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

pixiepower.scene.ChoosePlayer.prototype = Object.create(rune.scene.Scene.prototype);
pixiepower.scene.ChoosePlayer.prototype.constructor = pixiepower.scene.ChoosePlayer;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
pixiepower.scene.ChoosePlayer.prototype.init = function () {
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

    this.text = new rune.text.BitmapField("CHOOSE YOUR CHARACTER", "image_alfafont");

    this.text.autoSize = true;
    this.text.center = this.application.screen.center;
    this.text.y = 35;

    this.text.color = "#FFFFFF";
    this.stage.addChild(this.text);

    this.initFairies();

    this.selectedByP1 = 0;
    this.selectedByP2 = 1;


    this.p1text = new rune.text.BitmapField("player1", "image_font_testsmall");
    this.p1text.autoSize = true;
    this.stage.addChild(this.p1text);

    this.gamepad2 = this.gamepads.get(1);
    if (this.gamepad2.connected) {
        this.selectedByP2 = 1;
        this.p2text = new rune.text.BitmapField("player2", "image_font_testsmall");
        this.p2text.autoSize = true;
        this.stage.addChild(this.p2text);
    } else {
        this.selectedByP2 = -1;
    }


    this.updateHighlight();

};


pixiepower.scene.ChoosePlayer.prototype.initFairies = function () {

    this.fairies = new rune.display.DisplayGroup(this.stage);

    this.characters = [
        { name: "Sol", image: "image_game_Sol" },
        { name: "Filippa", image: "image_game_Filippa" },
        { name: "Henrik", image: "image_game_Henrik" },
        { name: "Rebecka", image: "image_game_Rebecka" },
        { name: "Kalle", image: "image_game_Kalle" }
    ]

    for (var i = 0; i < this.characters.length; i++) {
        var fairy = new Fairy(this.characters[i].image, 50 + i * 70, 100);
        this.characters[i].fairy = fairy;
        this.fairies.addMember(fairy);
    }

};


pixiepower.scene.ChoosePlayer.prototype.updateHighlight = function () {

    var members = this.fairies.getMembers();

    var selected = members[this.selectedByP1];
    if (selected && this.p1text && !this.p1text.flicker.active) {
        this.p1text.x = selected.x + (selected.width - this.p1text.width) / 2;
        this.p1text.y = selected.y - 20;
    }


    if (this.gamepad2 && selected && this.p2text && !this.p2text.flicker.active) {
        var selectedP2 = members[this.selectedByP2];
        this.p2text.x = selectedP2.x + (selectedP2.width - this.p2text.width) / 2;
        this.p2text.y = selectedP2.y - 20;

    }


};


pixiepower.scene.ChoosePlayer.prototype.twoPlayers = function () {

    var gamepad1 = this.gamepads.get(0);
    var maxIndex = this.fairies.getMembers().length - 1;

    if (this.gamepad2.stickLeftJustLeft) {
        var newIndex = this.selectedByP2 - 1;
        while (newIndex >= 0 && newIndex === this.selectedByP1) {
            newIndex--;
        }
        if (newIndex >= 0) {
            this.selectedByP2 = newIndex;
            this.updateHighlight();
        }
    }

    if (this.gamepad2 && this.gamepad2.stickLeftJustRight) {
        var newIndex = this.selectedByP2 + 1;
        while (newIndex <= maxIndex && newIndex === this.selectedByP1) {
            newIndex++;
        }
        if (newIndex <= maxIndex) {
            this.selectedByP2 = newIndex;
            this.updateHighlight();
        }
    }

    if (this.gamepad2 && this.gamepad2.justPressed(0)) {
        this.p2text.flicker.start(Infinity, 350);
    }
    if (this.gamepad2 && this.gamepad2.justPressed(1)) {
        this.p2text.flicker.stop();
    }


    if (this.p1text.flicker.active && this.p2text && this.p2text.flicker.active && this.gamepad2) {
        var startText = new rune.text.BitmapField("press x to start", "image_font_testsmall");
        startText.autoSize = true;
        startText.center = this.application.screen.center;
        startText.y = 180;
        this.stage.addChild(startText);

        if (gamepad1.justPressed(2) || this.gamepad2.justPressed(2)) {
            var p1Character = this.characters[this.selectedByP1].image;
            var p2Character = this.characters[this.selectedByP2].image;

            this.cameras.getCameraAt(0).fade.out(250, function () {
                this.application.scenes.load([
                    new pixiepower.scene.Game(p1Character, p2Character, this.highscores)
                ]);
            }, this);
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
pixiepower.scene.ChoosePlayer.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);

    var gamepad = this.gamepads.get(0);

    if (gamepad.justPressed(1)) {
        this.cameras.getCameraAt(0).fade.out(250, function () {
            this.application.scenes.load([
                new pixiepower.scene.Start()
            ]);
        }, this);
    }


    if (this.gamepad2.connected) {
        this.twoPlayers();
    }

    var gamepad1 = this.gamepads.get(0);
    //var gamepad2 = this.gamepads.get(1);

    var maxIndex = this.fairies.getMembers().length - 1;

    if (gamepad1.stickLeftJustLeft) {
        var newIndex = this.selectedByP1 - 1;
        while (newIndex >= 0 && newIndex === this.selectedByP2) {
            newIndex--;
        }
        if (newIndex >= 0) {
            this.selectedByP1 = newIndex;
            this.updateHighlight();
        }
    }

    if (gamepad1.stickLeftJustRight) {
        var newIndex = this.selectedByP1 + 1;
        while (newIndex <= maxIndex && newIndex === this.selectedByP2) {
            newIndex++;
        }
        if (newIndex <= maxIndex) {
            this.selectedByP1 = newIndex;
            this.updateHighlight();
        }
    }

    if (gamepad1.justPressed(0)) {
        this.p1text.flicker.start(Infinity, 350);
    }
    if (gamepad1.justPressed(1)) {
        this.p1text.flicker.stop();
    }


    if (this.p1text.flicker.active && !this.gamepad2.connected) {

        var startText = new rune.text.BitmapField("press x to start", "image_font_testsmall");
        startText.autoSize = true;
        startText.center = this.application.screen.center;
        startText.y = 180;
        this.stage.addChild(startText);


        if (gamepad1.justPressed(2)) {
            var p1Character = this.characters[this.selectedByP1].image;

            this.cameras.getCameraAt(0).fade.out(250, function () {
                this.application.scenes.load([
                    new pixiepower.scene.GameOnePlayer(p1Character, this.highscores)
                ]);
            }, this);

        }
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
pixiepower.scene.ChoosePlayer.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};