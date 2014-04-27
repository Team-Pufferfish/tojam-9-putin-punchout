/*
 Animate A Combo Bar
 */

//Player1.attribute.changed

Crafty.c("ComboBar",{

    init: function(){
        this.requires('2D,Tween,Attributes');
    },

    setup: function(attr) {
        var component = this;

        var drawWidth = 40;
        var drawHeight = 400;
        var maxCombo = 10;
        var attackerCombo = 0;
        var defenderCombo = 0;

        var totalStamina = 10;

        var topX = attr.topX;
        var topY = attr.topY;

        var outer = Crafty.e("2D, DOM, Color, Image").image("./gui/combobar.png")
            .color("#666666").attr({w:drawWidth, h:drawHeight,x:attr.topX, y:attr.topY});

        var innerAttack = Crafty.e("2D, DOM, Color")//red
            .color(attr.colourP1).attr({w:drawWidth*0.8, h:0,x:attr.topX + drawWidth * 0.1 , y:attr.topY + drawHeight/2});

        var innerDefend = Crafty.e("2D, DOM, Color")//white
            .color(attr.colourP2).attr({w:drawWidth*0.8, h:0,x:attr.topX + drawWidth * 0.1, y:attr.topY + drawHeight/2*0.6});

        var comboGem = Crafty.e("2D, DOM, Color, Image").image("./gui/combo_thing.png")
            .color("#00EEFF").attr({alpha: 0.8,w:40, h:40,x:attr.topX, y:attr.topY + drawHeight/2 - 20});

        var comboText = Crafty.e("2D, DOM, Color, Text").attr({x:attr.topX, y:attr.topY + drawHeight/2 - 20, width: 400}).text('0')
            .textColor('#FFFFFF', 1.0)
            .textFont({ size: '32px', family:"Arial", weight: 'bold' })
            .css({'text-align': 'center', 'min-width':'40px'});

        Crafty.bind("combo.change",function(change){
                attackerCombo = change.attackerMultiplier;
                defenderCombo = change.defenderMultiplier;
                if (attackerCombo >= defenderCombo)
                    comboText.text(attackerCombo);
                else
                    comboText.text(defenderCombo);

                if (attackerCombo > maxCombo) attackerCombo = maxCombo;
                if (defenderCombo > maxCombo) defenderCombo = maxCombo;

                draw();
        });

        function draw() {
            //DRAW A REC THATS MAXSTAM * DRAWWIDTH
            var maxRatio = maxCombo / totalStamina;
            outer.attr({w:drawWidth * maxRatio});

            //DRAW A REC THAT"S (STAM/MAXSTAM) * 0.9 * DRAWWIDTH and 0.9 * MAXHEIGHT tall start at 0.05 * MAX WIDTH
            var drawRatio  = attackerCombo/maxCombo;//red
            innerAttack.attr({h:outer.h*0.95*drawRatio/2});

            //DRAW A REC THAT"S (STAM/MAXSTAM) * 0.9 * DRAWWIDTH and 0.9 * MAXHEIGHT tall start at 0.05 * MAX WIDTH
            var defenderRatio  = defenderCombo/maxCombo;//white
            innerDefend.attr({h:outer.h*0.95*defenderRatio/2});
            innerDefend.attr( {y:topY + (drawHeight - outer.h/2 - innerDefend.h)});


            //Set gem location and text location
            if (attackerCombo >= defenderCombo){
                comboText.attr({y:innerAttack.h + topY + drawHeight/2-20});
                comboGem.attr({y:innerAttack.h + topY + drawHeight/2-20});
            }else{
                comboText.attr({y:innerDefend.y - 20});
                comboGem.attr({y:innerDefend.y - 20});
            }

            //set text
        }


        return component;
    }


});