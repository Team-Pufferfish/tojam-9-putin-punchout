/*

Load up all assets for the game.

 */

Crafty.c("Graphics", {
        init: function () {
            this.requires('2D, Tween, Sprite, Image');
            Crafty.load("vladimir_test002");
            Crafty.load("punch_test001.png");
            Crafty.sprite(800,600,"vladimir_test002", {putinbody:[0,0]});
            Crafty.sprite(150,300,"punch_test001.png", {fist1:[0,0]});
        }
    }
);