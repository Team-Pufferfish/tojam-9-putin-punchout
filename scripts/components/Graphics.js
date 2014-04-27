/*

Load up all assets for the game.

 */

Crafty.c("Graphics", {
        init: function () {
            this.requires('2D,DOM, Tween, Sprite, Image,SpriteAnimation');
            //Crafty.load("vladimir_test002");
           // Crafty.load("punch_test001.png");

            //Graphics
            Crafty.sprite(480,550,"./animations/harper_punch.png", {HarperFist:[0,0]});
            Crafty.sprite(480,550,"./animations/putin_punch.png", {PutinFist:[0,0]});
            Crafty.sprite(500,541, "./animations/putin_fullset.png", {PutinSprite: [0,0]});
            Crafty.sprite(500,541, "./animations/harper_fullset.png", {HarperSprite: [0,0]});

            Crafty.sprite(100,100,"./animations/splatters.png", {BloodSplat:[0,0]});
        }
    }
);
