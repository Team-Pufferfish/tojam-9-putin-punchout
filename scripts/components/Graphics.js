/*

Load up all assets for the game.

 */

Crafty.c("Graphics", {
        init: function () {
            this.requires('2D,DOM, Tween, Sprite, Image,SpriteAnimation');
            //Crafty.load("vladimir_test002");
           // Crafty.load("punch_test001.png");

            //Graphics
            Crafty.sprite(480,450,"./animations/punch_jab.png", {HarperFist:[0,0]});
            Crafty.sprite(500,540, "./animations/putin_fullset.png", {PutinBody: [0,0]});

        }
    }
);

