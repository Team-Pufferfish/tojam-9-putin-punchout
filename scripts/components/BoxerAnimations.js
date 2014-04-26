/* Animates a boxer based on our standard sprite sheet. */
Crafty.c("Boxer", {
    init: function () {
            this.reel('IdleAnimate',1000, [[0, 0], [1, 0], [2, 0], [3, 0],[0,1]])
            .reel('BlockAnimate',400, [[1, 1], [2, 1], [3, 1]])
            .reel('UnBlockAnimate',-400, [[3, 1], [2, 1], [1, 1]])
            .reel('DodgeAnimate',200, [[0, 2], [1, 2], [2, 2],[3,2]]);
    }

});

Crafty.c("BoxingGlove", {
    init: function () {
        this.reel('PunchOutAnimate',200, [[0, 0], [1, 0], [2, 0]])
            .reel('PunchInAnimate',200, [[2, 0], [1, 0], [0, 0]]);
    }
});