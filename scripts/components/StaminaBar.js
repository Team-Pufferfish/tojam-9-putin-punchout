/*
Animate A Stamina Bar
 */

//Player1.attribute.changed

Crafty.c("StaminaBar",{


    init: function(){
        this.requires('2D, Tween, Attribute');
    },

    setup: function(attr) {
        var component = this;

        component.drawWidth = 200;
        component.drawHieght = 40;

        component.playerID = attr.playerID;
        component.maxStamina = attr.maxStamina;
        component.currentStamina = attr.stamina;
        component.totalStamina = attr.totalStamina;
        component.topX = attr.topX;
        component.topY = attr.topY;

        component.outer = Crafty.e("2D, DOM, Color")
            .color("#666666").attr({w:component.drawWidth, h:component.drawHieght,x:component.topX, y:component.topY});

        component.inner = Crafty.e("2D, DOM, Color")
            .color("#FFFFFF").attr({w:component.drawWidth*0.9, h:component.drawHieght*0.6,x:component.topX + component.drawWidth * 0.05, y:component.topY + component.drawHieght * 0.2});

        component.bind(component.playerID + "attribute.changed", function(change){
           console.log("status bar changing")
           if(change.name === "maxStamina" || change.name === "stamina"){
               component.draw();
           }
        });

        return component;
    },

    draw: function() {
        //DRAW A REC THATS MAXSTAM * DRAWWIDTH
        var maxRatio = component.maxStamina / component.totalStamina;
        outer.attr({w:component.drawWidth * maxRatio, h:component.drawHieght});

        //DRAW A REC THAT"S (STAM/MAXSTAM) * 0.9 * DRAWWIDTH and 0.9 * MAXHEIGHT tall start at 0.05 * MAX WIDTH
        var drawRatio  = component.currentStamina/component.maxStamina;
        inner.attr({w:component.outer.w*0.9*drawRatio, h:component.drawHieght*0.6,x:component.drawWidth *0.05, y:component.drawHieght *0.2});
    }
});