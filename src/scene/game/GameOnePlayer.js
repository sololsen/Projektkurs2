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
 * @param {string} p1Character - The choosen fairy for player one
 * @param {object} highscores - Object with highscore information
 * 
 * Game scene for one player
 */
pixiepower.scene.GameOnePlayer = function (p1Character, highscores) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
    this.p1choosen = p1Character;
    this.highscores = highscores;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

pixiepower.scene.GameOnePlayer.prototype = Object.create(rune.scene.Scene.prototype);
pixiepower.scene.GameOnePlayer.prototype.constructor = pixiepower.scene.GameOnePlayer;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.init = function () {
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

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_game_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);

    this.filippa = new Filippa(this.p1choosen);

    this.borderBottom = new rune.display.DisplayObject(0, 225, 400, 1);
    this.borderLeft = new rune.display.DisplayObject(0, 0, 1, 225);
    this.borderRight = new rune.display.DisplayObject(400, 0, 1, 225);
    this.borderTop = new rune.display.DisplayObject(0, 20, 400, 1);


    this.borderBottom.immovable = true;
    this.borderLeft.immovable = true;
    this.borderRight.immovable = true;
    this.borderTop.immovable = true;

    this.fairies = new rune.display.DisplayGroup(this.stage);
    this.fairies.addMember(this.filippa)

    bgContainer.addChild(this.filippa.emitter);

    this.stage.addChild(this.borderBottom);
    this.stage.addChild(this.borderLeft);
    this.stage.addChild(this.borderRight);
    this.stage.addChild(this.borderTop);

    this.initFlower();
    this.initWaterdroplet();

    this.lightballs = new rune.display.DisplayGroup(this.stage);

    this.initThorns();
    this.initWeeds();
    this.initMushrooms();
    this.initHud();
    this.initBossWeeds();
    this.initPowerups();

    /**
     * Zone where it's possible for a player to water the flower
     */
    this.waterZone = new rune.display.Graphic(
        this.flower.x,
        this.flower.y,
        this.flower.width,
        this.flower.height + 10
    );

    this.stage.addChild(this.waterZone);
    this.timers.create({
        duration: 2000,
        onTick: function () {
            this.sound_protect.volume = 0.9;
            this.sound_protect.play();
        }.bind(this)
    });


    this.sound_protect = this.application.sounds.sound.get("sound_protectheflower");
    this.sound_blub = this.application.sounds.sound.get("sound_blub");
    this.sound_helpme = this.application.sounds.sound.get("sound_helpme");
    this.sound_waterPickup = this.application.sounds.sound.get("sound_waterpickup");
    this.sound_waterSplash = this.application.sounds.sound.get("sound_watersplash");
    this.sound_isThatJesus = this.application.sounds.sound.get("sound_isthatjesus");
    this.sound_powerup = this.application.sounds.sound.get("sound_powerup");
    this.sound_ohno = this.application.sounds.sound.get("sound_ohno");
    this.sound_dramabush = this.application.sounds.sound.get("sound_deadbush");
    this.sound_teamwork = this.application.sounds.sound.get("sound_teamwork");

    this.application.sounds.master.get("sound_startsong").fade(0, 2000);

    /**
     * Music from #Uppbeat (free for Creators!): https://uppbeat.io/t/giulio-fazio/8bit-canon
     * License code: Z9JLRP3JRDB7WPJD
     */
    this.bgm = this.application.sounds.music.get("themesong");
    this.bgm.volume = 0;
    this.bgm.loop = true;
    this.bgm.play();
    this.bgm.fade(0.5, 2000);

    this.selected = [];
    this.selectedI = 0;


};


/**
 * Makes a new camera for effects
 * @inheritDoc
 * @param {number} step Fixed time step.
 */
pixiepower.scene.GameOnePlayer.prototype.m_initCamera = function (step) {
    this.camera = new Camera();
    this.cameras.addCamera(this.camera);
};


/**
 * Initializes the game HUD
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.initHud = function () {

    this.score = 0;
    this.displayCounter = new rune.text.BitmapField("", "image_alfafont");
    this.displayCounter.autoSize = true;
    this.displayCounter.x = 185;
    this.displayCounter.y = 5;
    this.displayCounter.backgroundColor = "#000000"
    this.stage.addChild(this.displayCounter);

    this.displayPlayer1 = new rune.text.BitmapField("", "image_alfafont");
    this.displayPlayer1.autoSize = true;
    this.stage.addChild(this.displayPlayer1);
    this.displayPlayer1.x = 10;
    this.watercan1 = new Watercan(110, 0);
    this.stage.addChild(this.watercan1);


};


/**
 * Initializes the mushroom enemy
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.initMushrooms = function () {

    this.mushrooms = new rune.display.DisplayGroup(this.stage);


    this.timers.create({
        duration: 6000,
        repeat: Infinity,
        onTick: function () {
            var mushroom = new Mushroom();
            this.mushrooms.addMember(mushroom);
        }.bind(this)
    });


}


/**
 * Initializes waterdroplets and starts a flicker for it to be removed after a certain time
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.initWaterdroplet = function () {

    this.waterdroplets = new rune.display.DisplayGroup(this.stage);

    this.timers.create({
        duration: 2500,
        repeat: Infinity,
        onTick: function () {
            this.waterdroplet = new Waterdroplet();
            this.waterdroplets.addMember(this.waterdroplet);
        }.bind(this)
    });


    this.timers.create({
        duration: 7000,
        repeat: Infinity,
        onTick: function () {
            var members = this.waterdroplets.getMembers();
            if (members.length > 0) {
                var randomI = Math.floor(Math.random() * members.length);
                var toBeRemoved = members[randomI];
                toBeRemoved.flicker.start(2000, 200);

                this.removeWaterdrop(toBeRemoved);
            }
        }.bind(this)
    })
};


/**
 * Removes a waterdroplet
 * @param {object} toBeRemoved - The waterdroplet that is going to be removed
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.removeWaterdrop = function (toBeRemoved) {

    this.timers.create({
        duration: 2000,
        repeat: Infinity,
        onTick: function () {

            this.stage.removeChild(toBeRemoved);
            this.waterdroplets.removeMember(toBeRemoved);
        }.bind(this)
    })

}

/**
 * Initializes the powerups with an 10% chance of spawn every nine seconds and if it's not already spawned
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.initPowerups = function () {


    this.timers.create({
        duration: 15000,
        repeat: Infinity,
        onTick: function () {
            if (Math.random() < 0.10 && !this.jesusPowerup) {
                this.jesusPowerup = new Powerup("image_game_powerup_jesus");
                this.stage.addChild(this.jesusPowerup);
            }

        }.bind(this)
    });

    this.timers.create({
        duration: 15000,
        repeat: Infinity,
        onTick: function () {
            if (Math.random() < 0.10 && !this.bombPowerup) {
                this.bombPowerup = new Powerup("image_game_powerup_bomb");
                this.stage.addChild(this.bombPowerup);
            }

        }.bind(this)
    });


};


/**
 * Initializes the weed enemy
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.initWeeds = function () {

    this.weeds = new rune.display.DisplayGroup(this.stage);

    this.spawnInterval = 5000;

    /**
     * Increases the spawning amount over time
     */
    var startSpawnTimer = function () {
        if (this.spawnTimer) {
            this.spawnTimer.stop();
        }

        this.spawnTimer = this.timers.create({
            duration: this.spawnInterval,
            repeat: Infinity,
            onTick: function () {
                for (var i = 0; i < 2; i++) {
                    var weed = new Weed();
                    this.weeds.addMember(weed);
                    this.stage.addChildAt(weed, 1);

                }

            }.bind(this)
        });
    }.bind(this);

    startSpawnTimer();

    this.timers.create({
        duration: 10000,
        repeat: 12,
        onTick: function () {
            if (this.spawnInterval > 500) {
                this.spawnInterval -= 200;
                startSpawnTimer();
            }
        }.bind(this)
    });


}


/**
 * Initializes the boss weed
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.initBossWeeds = function () {
    this.bossWeeds = new rune.display.DisplayGroup(this.stage);

    var spawnInterval = 40000;

    this.timers.create({
        duration: spawnInterval,
        repeat: Infinity,
        onTick: function () {
            var bossWeed = new BossWeed();
            this.bossWeeds.addMember(bossWeed);
        }
    });


}


/**
 * Initializes the thorn enemy
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.initThorns = function () {

    this.allThorns = new rune.display.DisplayGroup(this.stage);

    var spawnInterval = 3000;

    this.timers.create({
        duration: spawnInterval,
        repeat: Infinity,
        onTick: function () {
            this.thorn = new Thorn();
            this.allThorns.addMember(this.thorn);
        }
    });


};

/**
 * Initializes the flower that needs protection and watering. Takes damage every 8th second
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.initFlower = function () {

    this.flower = new Flower();
    this.stage.addChild(this.flower);

    this.timers.create({
        duration: 8000,
        repeat: Infinity,
        onTick: function () {
            this.flower.flowerDamage(5);
        }.bind(this)
    });


};


/**
 * Check if a fairy has touched a thorn and if so they get stuck
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.handleThorns = function () {

    this.fairies.forEachMember(function (fairy) {
        if (!fairy.isStuck) {
            this.allThorns.forEachMember(function (thorn) {
                if (fairy.hitTestObject(thorn)) {
                    this.sound_helpme.volume = 0.9;
                    this.sound_helpme.play();

                    fairy.isStuck = true;
                    fairy.immovable = true;
                }
            }.bind(this));
        }
    }.bind(this));

};



/**
 * Controls the water pick up level and if the drops are placed inside the flowers waterzone
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.handleWaterdroplets = function () {

    this.waterdroplets.forEachMember(function (droplet) {
        var collected = false;

        this.fairies.forEachMember(function (fairy) {
            if (droplet.hitTestObject(fairy) && fairy.waterCollection < 3 && !collected) {

                this.sound_waterPickup.volume = 0.9;
                this.sound_waterPickup.play();
                fairy.addDrop(1);
                this.waterdroplets.removeMember(droplet);
                collected = true;

            }
        }.bind(this));
    }.bind(this));


    if (this.filippa.hitTestObject(this.waterZone) && this.gamepads.get(0).justPressed(7) && this.filippa.waterCollection > 0) {
        this.sound_waterSplash.volume = 0.9;
        this.sound_waterSplash.play();
        this.flower.flowerHeal(this.filippa.waterCollection);
        var droppedWater = new Waterdroplet;
        droppedWater.x = this.filippa.x;
        droppedWater.y = this.filippa.y;
        droppedWater.dropWater();
        this.stage.addChild(droppedWater);
        this.waterdroplets.forEachMember(function (droplet) {
            this.score += droplet.point;
        }.bind(this));
        this.filippa.waterCollection = 0;

    }



};


/**
 * Checks if a fairy has collected a powerup and starts features depending on which powerup was picked up
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.handlePowerups = function () {

    this.fairies.forEachMember(function (fairy) {
        if (fairy.hitTestObject(this.jesusPowerup)) {

            this.jesus = new Jesus();
            this.sound_isThatJesus.volume = 0.9;
            this.sound_isThatJesus.play();

            this.jesus.x = this.flower.x;
            this.jesus.y = this.flower.y - 35;
            this.stage.addChild(this.jesus);

            this.timers.create({
                duration: 500,
                repeat: 10,
                onTick: function () {
                    this.flower.flowerHeal(10);
                }.bind(this)
            });

            this.stage.removeChild(this.jesusPowerup);
            this.jesusPowerup = null;
        }
    }.bind(this))

    this.fairies.forEachMember(function (fairy) {
        if (fairy.hitTestObject(this.bombPowerup)) {
            this.sound_powerup.volume = 0.9;
            this.sound_powerup.play();
            fairy.powerUpShooting = true;
            this.timers.create({
                duration: 5000,
                onComplete: function () {
                    fairy.powerUpShooting = false;
                }
            });
            this.stage.removeChild(this.bombPowerup);
            this.bombPowerup = null;
        }
    }.bind(this))

}


/**
 * Checks if it's game over
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.gameOver = function () {

    if (this.flower.flowerLifeBar == 0) {

        this.gameOverStart = true;

        this.weeds.forEachMember(function (weed) {
            weed.dispose()
        })
        this.allThorns.forEachMember(function (thorn) {
            thorn.dispose()
        })
        this.mushrooms.forEachMember(function (mushroom) {
            mushroom.dispose()
        })
        this.waterdroplets.forEachMember(function (droplet) {
            droplet.dispose()
        })
        this.bossWeeds.forEachMember(function (boss) {
            boss.dispose()
        })
        this.waterdroplets.forEachMember(function (droplet) {
            droplet.dispose()
        })

        this.flower.dyingFlower();
        this.filippa.gameOverStop = true;

        var gameOverText = new rune.text.BitmapField("GAME OVER", "image_alfafont");

        gameOverText.autoSize = true;
        gameOverText.center = this.application.screen.center;
        gameOverText.y = 50;
        this.stage.addChild(gameOverText);

        this.reason = new rune.text.BitmapField("the flower died", "image_font_testnew");

        this.reason.autoSize = true;
        this.reason.center = this.application.screen.center;
        this.reason.y = 70;
        this.stage.addChild(this.reason);

        var highscoreTest = this.highscores.test(this.score, 0);

        if (highscoreTest !== -1) {
            this.timers.create({
                duration: 2500,
                repeat: 1,
                onComplete: function () {
                    this.cameras.getCameraAt(0).fade.out(250, function () {
                        this.application.scenes.load([
                            new pixiepower.scene.GameOver(this.score, this.highscores)
                        ]);
                    }, this);
                }.bind(this)
            });
        } else {
            if (!this.createdText) {
                var texts = ["PLAY AGAIN", "MENU"];


                for (var i = 0; i < texts.length; i++) {
                    var text = new rune.text.BitmapField(texts[i], "image_alfafont");
                    text.x = 130 + i * 100;
                    text.y = 160;
                    text.autoSize = true;
                    this.stage.addChild(text);
                    this.selected.push(text);
                }
                this.createdText = true;
            }

            this.updateHighlight();
        }
    }


    if (this.filippa.isStuck) {


        this.weeds.forEachMember(function (weed) {
            weed.dispose()
        })
        this.mushrooms.forEachMember(function (mushroom) {
            mushroom.dispose()
        })
        this.waterdroplets.forEachMember(function (droplet) {
            droplet.dispose()
        })
        this.bossWeeds.forEachMember(function (boss) {
            boss.dispose()
        })

        var gameOverText = new rune.text.BitmapField("GAME OVER", "image_alfafont");

        gameOverText.autoSize = true;
        gameOverText.center = this.application.screen.center;
        gameOverText.y = 50;
        this.stage.addChild(gameOverText);

        this.reason = new rune.text.BitmapField("you got stuck", "image_font_testnew");

        this.reason.autoSize = true;
        this.reason.center = this.application.screen.center;
        this.reason.y = 70;
        this.stage.addChild(this.reason);

        var highscoreTest = this.highscores.test(this.score, 0);
        this.gameOverStart = true;

        if (highscoreTest !== -1) {
            this.timers.create({
                duration: 2500,
                repeat: 1,
                onComplete: function () {
                    this.application.scenes.load([
                        new pixiepower.scene.GameOver(this.score, this.highscores)
                    ]);
                }.bind(this)
            });
        } else {
            if (!this.createdText) {
                var texts = ["PLAY AGAIN", "MENU"];


                for (var i = 0; i < texts.length; i++) {
                    var text = new rune.text.BitmapField(texts[i], "image_alfafont");
                    text.x = 130 + i * 100;
                    text.y = 160;
                    text.autoSize = true;
                    this.stage.addChild(text);
                    this.selected.push(text);
                }
                this.createdText = true;
            }
            this.updateHighlight();
        }

    }
};

/**
 * Updates the highligt of the selected choice when lever is moved
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.updateHighlight = function () {

    for (var i = 0; i < this.selected.length; i++) {
        if (i == this.selectedI) {
            this.selected[i].backgroundColor = "#FFC0CB";
        } else {
            this.selected[i].backgroundColor = "";
        }
    }

};

/**
 * Checks if the player is controlling the gameover menu
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.updateGameOver = function () {

    this.updateHighlight();
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
        switch (this.selectedI) {
            case 0:
                this.cameras.getCameraAt(0).fade.out(250, function () {
                    this.application.scenes.load([
                        new pixiepower.scene.ChoosePlayer(this.highscores)
                    ]);
                }, this);
                break;
            case 1:
                this.cameras.getCameraAt(0).fade.out(250, function () {
                    this.application.scenes.load([
                        new pixiepower.scene.Start(this.highscores)
                    ]);
                }, this);
                break;
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
pixiepower.scene.GameOnePlayer.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);

    if (this.gameOverStart) {
        this.updateGameOver();
    };

    this.gameOver();
    this.displayCounter.text = "";
    this.displayCounter.text = this.score.toString();

    this.displayPlayer1.text = "";
    this.displayPlayer1.text = "PLAYER 1 " + this.filippa.waterCollection.toString() + "/3";
    this.watercan1.updatePicture(this.filippa.waterCollection);


    var cam = this.cameras.getCameraAt(0);

    this.mushrooms.forEachMember(function (mushroom) {
        rune.physics.Space.separate(this.flower, mushroom);

        var nearestPlayer = this.filippa;

        mushroom.getDistanceOfPlayers(nearestPlayer);

        /**
        * Wavy and colorful effect on camera when stepping on a mushroom enemy
        */
        if (mushroom.hitTestGroup(this.fairies)) {

            this.stage.removeChild(mushroom);
            this.mushrooms.removeMember(mushroom);
            cam.wavy = true;

            cam.tint = new rune.camera.CameraTint();
            cam.tint.color = new rune.color.Color24();
            cam.tint.opacity = 0.4;

            var colors = [
                { r: 255, g: 105, b: 180 },
                { r: 255, g: 0, b: 0 },
                { r: 255, g: 128, b: 0 },
                { r: 255, g: 255, b: 0 },
                { r: 0, g: 255, b: 0 },
                { r: 128, g: 0, b: 255 }
            ];

            var index = 0;

            var fadeTimer = this.timers.create({
                duration: 250,
                repeat: 24,
                onTick: function () {
                    var c = colors[index];
                    cam.tint.color.setRGB(c.r, c.g, c.b);
                    index++;
                    if (index >= colors.length) {
                        index = 0;
                    }
                }
            });

            this.timers.create({
                duration: 1000,
                onTick: function () {
                    this.sound_ohno.volume = 0.9;
                    this.sound_ohno.play();
                }.bind(this)
            });


            this.timers.create({
                duration: 7000,
                onComplete: function () {
                    this.timers.remove(fadeTimer);
                    cam.tint.opacity = 0;
                    cam.wavy = false;
                }
            });
        }
    }.bind(this));


    this.weeds.forEachMember(function (weed) {
        rune.physics.Space.separate(this.flower, weed);
        if (this.flower.hitTestObject(weed) && weed.canHit) {
            this.flower.flowerDamage(2);
            this.flower.flicker.start();
            weed.canHit = false;
            this.timers.create({
                duration: 2000,
                onTick: function () {
                    weed.canHit = true;
                }
            })
        }

        this.fairies.forEachMember(function (fairy) {
            rune.physics.Space.separate(fairy, weed);
        }.bind(this));
    }.bind(this));


    /**
     * Separates fairies from borders so they can't fly outside the cameraview
     */
    this.fairies.forEachMember(function (fairy) {

        rune.physics.Space.separate(fairy, this.borderBottom);
        rune.physics.Space.separate(fairy, this.borderLeft);
        rune.physics.Space.separate(fairy, this.borderRight);
        rune.physics.Space.separate(fairy, this.borderTop);

    }.bind(this))



    this.lightballs.forEachMember(function (ball) {
        if (ball.isDead) {
            this.lightballs.removeMember(ball);
        }

        this.allThorns.forEachMember(function (thorn) {
            if (ball.hitTestObject(thorn)) {
                this.stage.addChild(thorn.emitter);
                thorn.emitter.emit(30);
                this.allThorns.removeMember(thorn);
                this.lightballs.removeMember(ball);
                this.fairies.forEachMember(function (fairy) {
                    if (fairy.isStuck == true && fairy.hitTestObject(thorn)) {

                        fairy.isStuck = false;
                        fairy.immovable = false;
                    }
                });


                // return false;
            }
        }.bind(this));


        this.weeds.forEachMember(function (weed) {
            if (ball.hitTestObject(weed)) {
                weed.hp--;

                if (weed.hp == 0) {
                    this.sound_dramabush.volume = 0.9;
                    this.sound_dramabush.play();

                    this.stage.addChild(weed.emitter);
                    weed.emitter.emit(30);
                    this.weeds.removeMember(weed);
                    this.score += 50;
                }

                /**
                 * Changes weeds color to red when shot
                 */
                var originalColor = rune.color.Color24.fromHex("4b692f");
                var hitColor = rune.color.Color24.fromHex("ac2828");
                weed.texture.replaceColor(originalColor, hitColor);
                this.timers.create({
                    duration: 200,
                    onTick: function () {
                        weed.texture.replaceColor(hitColor, originalColor);
                    }
                });
                this.lightballs.removeMember(ball);
            }

        }.bind(this));



        this.mushrooms.forEachMember(function (mushroom) {
            rune.physics.Space.separate(this.flower, mushroom);
            if (ball.hitTestObject(mushroom)) {
                this.stage.addChild(mushroom.emitter);
                mushroom.emitter.emit(30);
                this.mushrooms.removeMember(mushroom);
                this.lightballs.removeMember(ball);
                this.score += 25;

            }
        }.bind(this));



        this.bossWeeds.forEachMember(function (bossWeed) {

            if (this.flower.hitTestObject(bossWeed) && bossWeed.canHit) {
                this.flower.flowerDamage(10);
                this.flower.flicker.start();
                bossWeed.canHit = false;
                this.timers.create({
                    duration: 2000,
                    onTick: function () {
                        bossWeed.canHit = true;
                    }
                })
            }

            if (ball.hitTestObject(bossWeed)) {

                this.lightballs.removeMember(ball);
                bossWeed.hp--;
                this.camera.shake.start(300, 1, 1);

                /**
                 * Changes bossweeds color to red when shot
                 */
                var originalColor = rune.color.Color24.fromHex("4b692f");
                var hitColor = rune.color.Color24.fromHex("ac2828");
                bossWeed.texture.replaceColor(originalColor, hitColor);
                this.timers.create({
                    duration: 200,
                    onTick: function () {
                        bossWeed.texture.replaceColor(hitColor, originalColor);
                    }
                });
            }

            /**
             * Spawns two new weed enemies when bossweed is dead
             */
            if (bossWeed.hp == 0) {
                var weed1 = new Weed(bossWeed.x, bossWeed.y);
                var weed2 = new Weed(bossWeed.x + 10, bossWeed.y + 10);

                this.weeds.addMember(weed1);
                this.weeds.addMember(weed2);

                this.bossWeeds.removeMember(bossWeed);

                this.sound_teamwork.volume = 0.9;
                this.sound_teamwork.play();

                this.score += 100;
            }
        }.bind(this));

    }.bind(this));



    this.bossWeeds.forEachMember(function (bossWeed) {
        rune.physics.Space.separate(this.flower, bossWeed);
    }.bind(this));



    /**
     * Shooting logic
     */
    if (this.gamepads.get(0).justPressed(2)) {
        if (this.filippa.isStuck == false) {
            this.sound_blub.volume = 0.9;
            this.sound_blub.play();


            if (this.filippa.powerUpShooting) {
                var balls = this.filippa.shootPowerUp();


                for (var i = 0; i < balls.length; i++) {
                    this.lightballs.addMember(balls[i]);
                }
            } else {
                var ball = this.filippa.shoot();
                this.lightballs.addMember(ball);
            }

        }

    }


    this.handleThorns();
    this.handleWaterdroplets();
    this.handlePowerups();



};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
pixiepower.scene.GameOnePlayer.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};