/*
Splatter Pattern

 */
Crafty.c("Splat", {
    init: function () {
        this.requires('Graphics, BloodSplat');

        var component = this;

        var direction = -1;

        this.reel("SweatSplatter",400,[[0, 0], [1, 0], [2, 0], [3, 0],[0, 1]])
                 .reel("BloodSplatter",400,[[0, 1], [1, 1], [2, 1], [3, 1],[0, 1]]);
    },
    setUp: function(hand) {
        this.bind("Game.splatter"+hand, function (attr){
           this.playAt(attr.x,attr.y,attr.reelName,attr.hand);
        });
    },
    playAt: function(x,y,reelName, setFlip) {
        this.attr({x:x,y:y});
        this.animate(reelName, 1);
    }
});
