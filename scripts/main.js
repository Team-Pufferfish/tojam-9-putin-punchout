/**
 * Created by myabko on 2014-04-21.
 */
gameSettings = {
    width: 640,
    height: 480
};


window.addEventListener('load', function(){
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(gameSettings.width, gameSettings.height);
    Crafty.background('green');

    // Simply start the "Loading" scene to get things going
    Crafty.scene('test');
});