/**
 * Created by furrot on 2014-04-25.
 */
Crafty.scene('assettest', function() {

    var bodysprite = Crafty.e("2D, Canvas, Image, Tween").attr({rotation:0,x: 0, y: 0, width: 300, height: 500}).image("vladimir_test002").origin("center");

    var lefty = Crafty.e('2D, Canvas, Color,Image, Tween').attr({punch_out:0,rotation:0,x:gameSettings.width/2-300, y: gameSettings.height - 150, w: 150, h: 300}).image("punch_test001.png").origin("center").flip("X");

    var righty = Crafty.e('2D, Canvas, Color, Image, Tween').attr({punch_out:0,rotation:-25,x: gameSettings.width/2+50, y: gameSettings.height - 350, w: 150, h: 300}).image("punch_test001.png").origin("center");

});