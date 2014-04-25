/**
 * Created by myabko on 2014-04-21.
 */
gameSettings = {
    width: 801,
    height: 601
};

window.addEventListener('load', function(){
    // Start crafty and set a background color so that we can see it's working
    if (window.innerWidth < gameSettings.width)
    {
        Crafty.init(Crafty.DOM.window.width,Crafty.DOM.window.height);
    } else {
        Crafty.init(gameSettings.width, gameSettings.height);
    }

    Crafty.background('green');

    // Simply start the "Loading" scene to get things going
    Crafty.scene('testingEvents');
});