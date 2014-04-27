/**
 * Created by myabko on 2014-04-26.
 */
Crafty.c("Combo",{
   init: function(){
       this.requires("Attributes")
   },



    setupCombo: function(playerID,opponentID,attributeToIncreaseForDefense, attributeToIncreaseForOffence,DefRate,OffRate){

        var component = this;
        component.assignAttribute(playerID,"Combo",0);

        var defaultOff = component.getAttribute(playerID,attributeToIncreaseForOffence);

        var defaultDef = component.getAttribute(playerID,attributeToIncreaseForDefense);

        this.setComboRole = function(isAttacker){
            if (isAttacker){
                component.assignAttribute(playerID,attributeToIncreaseForDefense,defaultDef);
                adjustAttributes();
            } else {
                component.assignAttribute(playerID,attributeToIncreaseForOffence,defaultOff);
                adjustAttributes();
            }

        };

        var adjustAttributes = function(){
            var currentMultiplier = component.getAttribute(playerID,"Combo");
            if (component.role === component.ATTACK_ROLE){

                console.log("attackerCombo: ",currentMultiplier);
                var calculatedAttribute =
                    defaultOff +
                    OffRate * currentMultiplier;
                component.assignAttribute(playerID,attributeToIncreaseForOffence,calculatedAttribute);
                console.log("New "+attributeToIncreaseForOffence+":"+calculatedAttribute);

                    Crafty.trigger("combo.change",{
                        attackerMultiplier: currentMultiplier,
                        defenderMultiplier: component.getAttribute(opponentID,"Combo")
                    });



            } else {
                console.log("defenderCombo: ",currentMultiplier);
                var calculatedAttribute =
                    defaultDef +
                    DefRate * currentMultiplier;
                component.assignAttribute(playerID,attributeToIncreaseForDefense,calculatedAttribute);

                console.log("New "+attributeToIncreaseForDefense+":"+calculatedAttribute);
            }

        };

        this.changeComboMultiplier = function(shouldIncrease){
            var currentMultiplier = component.getAttribute(playerID,"Combo");
            var currentOpponentMultiplier = component.getAttribute(opponentID,"Combo");
            if (shouldIncrease){
                if (currentOpponentMultiplier === 0){
                    currentMultiplier++;
                }

            }
             else {
                if (currentMultiplier !== 0){
                    currentMultiplier--;
                }
            }
            component.assignAttribute(playerID,"Combo",currentMultiplier);

            adjustAttributes();


        }


    },

    changeComboMultiplier: undefined,
    setComboRole: undefined

});