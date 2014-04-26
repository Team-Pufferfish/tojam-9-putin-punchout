/* Animates a boxer based on our standard sprite sheet. */
Crafty.c("Boxer", {
    init: function () {
            this.reel('IdleAnimate',1000, [[0, 0], [1, 0], [2, 0], [3, 0],[0,1]])
            .reel('BlockAnimate',400, [[1, 1], [2, 1], [3, 1]])
            .reel('UnBlockAnimate',-400, [[3, 1], [2, 1], [1, 1]])
            .reel('DodgeRightAnimate',200, [[0, 2],[1, 2],[2, 2],[3,2]])
            .reel('DodgeLeftAnimate',200, [[3,3],[2, 3],[1, 3], [0, 3]]);
    }

});

Crafty.c("BoxingGlove", {
    init: function () {
        this.reel('PunchOutAnimate',200, [[0, 0], [1, 0], [2, 0]])
            .reel('PunchInAnimate',200, [[2, 0], [1, 0], [0, 0]]);
    }
});

Crafty.c("Swapper", {
    init: function () {

    },
    SwapPlayers: function (direction, body1, fistl1, fistr1, body2, fistl2, fistr2) {
        if(direction === "left"){
            //tween body left
            //tween glove right
            //tween glove right

            //set body2 right
            //set glove2 left

            //tween body2 left
            //tween glove2 right
            //tween glove2 right
        }
    }
});
