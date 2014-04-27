/*
 Animate A Timer Bar
 */

//Player1.attribute.changed

Crafty.c("RoundTimer", {
    init: function () {
        this.requires('2D, DOM, Attributes,Text, Delay');
    },

    initRoundTimer: function () {
        var component = this;

        component.attr({ x: gameSettings.width/2-(41), y: 8 })
            .text('00:00')
            .textColor('#FFFFFF', 1.0)
            .textFont({ size: '32px', family:"Arial", weight: 'bold' });

        component.assignAttribute("Game","Timer",15);


        Crafty.bind("Game.attribute.changed", function(change){
            if (change.newValue === 0)
                Crafty.trigger("RoundEnd");
            component.text(change.newValue);

        });
        return component;
    },

    resetRoundTimer: function(roundTime){
        this.assignAttribute("Game","Timer",roundTime);


        this.delay(function(){
           this.changeAttribute("Game","Timer",-1);
       },1000,roundTime - 1);

        return this;
    }
});