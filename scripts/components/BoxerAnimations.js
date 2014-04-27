/* Animates a boxer based on our standard sprite sheet. */
Crafty.c("Boxer", {
    init: function () {
            this.reel('IdleAnimate',1000, [[0, 0], [1, 0], [2, 0], [3, 0],[0,1]])
            .reel('BlockAnimate',300, [[1, 1], [2, 1], [3, 1]])
            .reel('UnBlockAnimate',300, [[3, 1], [2, 1], [1, 1]])
            .reel('DodgeRightAnimate',300, [[0, 2],[1, 2],[2, 2],[3,2]])
            .reel('DodgeLeftAnimate',300, [[3,3],[2, 3],[1, 3],[0, 3]])
             .reel('DieAnimate',300, [[3,3],[2, 3],[1, 3],[0, 3]])
            //.reel('DieAnimate',500, [[3,2],[3,2],[0, 3],[0, 3],[3,2],[3,2],[0, 3],[0, 3]])
            .reel('UnDodgeRightAnimate',300, [[3,2],[2, 2],[1, 2],[0, 2]])
            .reel('UnDodgeLeftAnimate',300, [[0, 3],[1, 3],[2, 3],[3,3]])
            .reel('UnDodgeRightBlockAnimate',300, [[3,2],[2, 2],[1, 2],[0, 2],[1, 1], [2, 1], [3, 1]])
            .reel('UnDodgeLeftBlockAnimate',300, [[0, 3],[1, 3],[2, 3],[3,3],[1, 1], [2, 1], [3, 1]]);
    }

});

Crafty.c("BoxingGlove", {
    init: function () {
        this.reel('PunchOutAnimate',200, [[0, 0], [1, 0], [2, 0]])
            .reel('PunchInAnimate',200, [[2, 0], [1, 0], [0, 0]]);
    }
});


     var SwapPlayers =  function (direction, time, body1, fistl1, fistr1, body2, fistl2, fistr2) {
         if (direction === "left") {
             //tween body2 return left
             body1.tween({tweenName: "bodyShiftOut", rotation: 0, x: gameSettings.width / 2 - 500 / 2 - 1000, y: 60}, time);
             //tween glove2 return right
             fistr1.tween({tweenName: "rightShiftOut", rotation: 0, x: gameSettings.width - 400 + 1000, y: gameSettings.height - 400}, time);
             //tween glove2 return right
             fistl1.tween({tweenName: "leftShiftOut", rotation: 0, x: -50 + 1000, y: gameSettings.height - 400}, time);

             //set body2 right
             body2.attr({x: gameSettings.width / 2 - 500 / 2 + 1000, y: 60});
             //set glove2 left
             fistr2.attr({x: gameSettings.width - 400 - 1000, y: gameSettings.height - 400});
             fistl2.attr({x: -50 - 1000, y: gameSettings.height - 400});

             //tween body2 return left
             body2.tween({tweenName: "bodyShift", rotation: 0, x: gameSettings.width / 2 - 500 / 2, y: 60}, time);
             //tween glove2 return right
             fistr2.tween({tweenName: "rightShiftBack", rotation: 0, x: gameSettings.width - 400, y: gameSettings.height - 400}, time);
             //tween glove2 return right
             fistl2.tween({tweenName: "leftShiftBack", rotation: 0, x: -50, y: gameSettings.height - 400}, time);
         }

         if (direction === "right") {
             //tween body2 return left
             body2.tween({tweenName: "bodyShiftOut", rotation: 0, x: gameSettings.width / 2 - 500 / 2 - 1000, y: 60}, time);
             //tween glove2 return right
             fistr2.tween({tweenName: "rightShiftOut", rotation: 0, x: gameSettings.width - 400 + 1000, y: gameSettings.height - 400}, time);
             //tween glove2 return right
             fistl2.tween({tweenName: "leftShiftOut", rotation: 0, x: -50 + 1000, y: gameSettings.height - 400}, time);

             //set body2 right
             body1.attr({x: gameSettings.width / 2 - 500 / 2 + 1000, y: 60});
             //set glove2 left
             fistr1.attr({x: gameSettings.width - 400 - 1000, y: gameSettings.height - 400});
             fistl1.attr({x: -50 - 1000, y: gameSettings.height - 400});

             //tween body2 return left
             body1.tween({tweenName: "bodyShift", rotation: 0, x: gameSettings.width / 2 - 500 / 2, y: 60}, time);
             //tween glove2 return right
             fistr1.tween({tweenName: "rightShiftBack", rotation: 0, x: gameSettings.width - 400, y: gameSettings.height - 400}, time);
             //tween glove2 return right
             fistl1.tween({tweenName: "leftShiftBack", rotation: 0, x: -50, y: gameSettings.height - 400}, time);
         }
     }
