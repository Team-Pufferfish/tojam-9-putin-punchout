/*
 Animate A Timer Bar
 */

//Player1.attribute.changed

Crafty.c("RoundTimer", {
    init: function () {
        this.requires('2D, DOM, Attributes,Text');
    },

    setup: function (attr) {
        var component = this;

        component.attr({ x: gameSettings.width/2-(41), y: 8 }).text('00:00')
            .textColor('#FFFFFF', 1.0)
            .textFont({ size: '32px', family:"Arial", weight: 'bold' });
        return component;

        var timer = Crafty.e("Attributes");

        timer.setAttribute("Timer",15000)

        timer.createAttributeAutoIncrementor("timer","Timer",-1);

        component.bind("timer.attribute.changed", function(change){
            console.log("tick")
            if(change.name === "Timer"){
                component.text(change.newValue);
            }
        });
    }
});