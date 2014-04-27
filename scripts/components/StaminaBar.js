/*
Animate A Stamina Bar
 */

//Player1.attribute.changed

Crafty.c("StaminaBar",{


    init: function(){
        this.requires('2D,Tween,Attributes');
    },

    setup: function(attr) {
        var component = this;

        var drawWidth = 200;
        var drawHeight = 40;
        var maxStamina;
        var currentStamina;
        var totalStamina;

        //component.topX = attr.topX;
       // component.topY = attr.topY;

        var outer = Crafty.e("2D, DOM, Color")
            .color("#666666").attr({w:drawWidth, h:drawHeight,x:attr.topX, y:attr.topY});

        var inner = Crafty.e("2D, DOM, Color")
            .color("#FFFFFF").attr({w:drawWidth*0.9, h:drawHeight*0.6,x:attr.topX + drawWidth * 0.05, y:attr.topY + drawHeight * 0.2});

        component.bind(attr.playerID + ".attribute.changed", function(change){
           if(change.name === "MaxStamina" || change.name === "CurrentStamina"){
               maxStamina = component.getAttribute(attr.playerID,"MaxStamina"); //attr.maxStamina;
               currentStamina = component.getAttribute(attr.playerID,"CurrentStamina");//attr.stamina;
               totalStamina = component.getAttribute(attr.playerID,"TotalStamina");//attr.totalStamina;
               draw();
           }
        });

        function draw() {
            //DRAW A REC THATS MAXSTAM * DRAWWIDTH
            var maxRatio = maxStamina / totalStamina;
            outer.attr({w:drawWidth * maxRatio});

            //DRAW A REC THAT"S (STAM/MAXSTAM) * 0.9 * DRAWWIDTH and 0.9 * MAXHEIGHT tall start at 0.05 * MAX WIDTH
            var drawRatio  = currentStamina/maxStamina;
            inner.attr({w:outer.w*0.9*drawRatio});
        }

        return component;
    }


});