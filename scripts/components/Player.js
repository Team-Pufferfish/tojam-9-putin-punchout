/**
 * Created by myabko on 2014-04-26.
 */
Crafty.c("Player",{
   init: function(){
       this.requires('LRController,Attributes,Graphics,Zonable,Defense,Punch,Combo');
   },

   ATTACK_ROLE: 0,
   DEFEND_ROLE: 1,
   role: -1,

   setup: function(attr,stats) {
       var component = this;

       /* attr variable
       ID -- playerID
       opponentID -- opponent's ID
       LeftControl -- String for button
       RightControl -- String for button
       BodySpriteName -- SpriteSheet Name
       GloveSpriteName -- SpriteSheet Name
        */


       component.assignControls({
           ID: attr.ID,
           LeftControl: attr.LeftControl,
           RightControl: attr.RightControl
       });


       component.role = attr.role;
       //Command Support
       function setupSprites() {
           component.body = Crafty.e("Graphics,Zonable, Defense,Boxer," + attr.BodySpriteName)
               .attr({rotation: 0, x: gameSettings.width / 2 - 500 / 2 + component.role * 1000 - 1000, y: 60, z: 0})
               .origin("center")
               .animate("IdleAnimate", -1)
               .setDefenderCallbacks()
               .attr("playerID", attr.ID);
           component.lefty = Crafty.e('Graphics, Punch, BoxingGlove,' + attr.GloveSpriteName)
               .attr({punch_out: 0, rotation: 0, x: -50 + component.role * 1000, y: gameSettings.height - 400, z: 100})
               .flip("X")
               .origin("center")
               .setPunchAnimation(true)
               .setPunchCallbacks();
           component.righty = Crafty.e('Graphics, Punch, BoxingGlove,' + attr.GloveSpriteName)
               .attr({punch_out: 0, rotation: 0, x: gameSettings.width - 400 + component.role * 1000, y: gameSettings.height - 400, z: 100})
               .origin("center")
               .setPunchAnimation(true)
               .setPunchCallbacks();
       }

       function setupStats(){
           if (!stats){
               stats = {
                   MaxStamina : 1000,
                   CurrentStamina: 1000,
                   TotalStamina: 1000,
                   StaminaRegenRate: 5,
                   PunchStrength: 50,
                   BlockMitigator: 0.2,
                   DefensiveComboRate: 5,
                   OffensiveComboRate: 10,
                   DefensiveComboStat: "StaminaRegenRate",
                   OffensiveComboStat: "PunchStrength"


               };
               //stuff here for created characters
           }
               _.each(stats,function(value,key){

                   console.log(attr.ID," setting stat: ",value + " key: "+ key);
                  component.assignAttribute(attr.ID,key,value);
               });

       }

       setupSprites();
       setupStats();
       setupOffensiveStamina();
       setupCombo();

       function setupCombo(){

           component.setupCombo(attr.ID,attr.opponentID,
               component.getAttribute(attr.ID,"DefensiveComboStat"),
               component.getAttribute(attr.ID,"OffensiveComboStat"),
               component.getAttribute(attr.ID,"DefensiveComboRate"),
               component.getAttribute(attr.ID,"OffensiveComboRate"));
           function trigger(e){

                if (e.result === component.PUNCH_HIT){
                   component.changeComboMultiplier(true);
               } else if (e.result === component.PUNCH_MISS){
                   component.changeComboMultiplier(false);
               }
           }
           component.lefty.bind("punch.end",trigger);
           component.righty.bind("punch.end",trigger);

           Crafty.bind("punch.miss",function(){
               if (component.role === component.DEFEND_ROLE)
                   component.changeComboMultiplier(true);
           });

           Crafty.bind("punch.hit",function(){
               if (component.role === component.DEFEND_ROLE)
                   component.changeComboMultiplier(false);
           });
       }

       function setupOffensiveStamina() {


           component.createAttributeAutoIncrementor(attr.ID,"CurrentStamina",
               "StaminaRegenRate","MaxStamina");
           component.runAutoIncrementorLoop(500);

               function triggerAction(e){
                   /* component.trigger("punch.end",{
                    punchType: e.punchType,
                    hand: e.hand,
                    damage: hitPercent * e.strength,
                    result: result
                    });*/

                   var attrToAdjust = "CurrentStamina";
                   if (e.result === component.PUNCH_BLOCK){
                       attrToAdjust = "MaxStamina";
                   }

                   var cStam = component.getAttribute(attr.opponentID,attrToAdjust);
                   if (cStam > 0){

                       var damageToDeal = e.damage;

                       if (cStam - e.damage < 0){
                           damageToDeal = cStam;
                       }

                       component.changeAttribute(attr.opponentID,attrToAdjust, -(damageToDeal));
                       if (component.getAttribute(attr.opponentID,"CurrentStamina") >
                           component.getAttribute(attr.opponentID,"MaxStamina")){
                           component.assignAttribute(attr.opponentID,"CurrentStamina",component.getAttribute(attr.opponentID,"MaxStamina"));
                       }

                   } else {

                       component.changeAttribute(attr.opponentID,"MaxStamina", -(e.damage));
                   }

               }

               component.lefty.bind("punch.end",triggerAction);
               component.righty.bind("punch.end",triggerAction);



       }


       component.input_locked = false;

       component.bind(attr.ID+".ButtonComplete",function(change) {
           if (component.role === component.ATTACK_ROLE && !component.input_locked) {
               if (change.button === component.LEFT_BUTTON && component.lefty.punch_out === 0 && component.righty.punch_out != 2) {
                   if (change.timeHeld <= 350) {
                       component.lefty.ThrowPunch(attr.ID, attr.opponentID, component.lefty.STRAIGHT, component.lefty.LEFT_PUNCH, 0, component.getAttribute(attr.ID,"PunchStrength"));
                   } else {
                       component.lefty.ThrowPunch(attr.ID, attr.opponentID, component.lefty.HOOK, component.lefty.LEFT_PUNCH, 0, component.getAttribute(attr.ID,"PunchStrength"));
                   }
               } else if (change.button === component.RIGHT_BUTTON && component.righty.punch_out === 0 && component.lefty.punch_out != 2) {
                   if (change.timeHeld <= 350) {
                       component.righty.ThrowPunch(attr.ID, attr.opponentID, component.righty.STRAIGHT, component.righty.RIGHT_PUNCH, 0, component.getAttribute(attr.ID,"PunchStrength"));
                   } else {
                       component.righty.ThrowPunch(attr.ID, attr.opponentID, component.righty.HOOK, component.righty.RIGHT_PUNCH, 0, component.getAttribute(attr.ID,"PunchStrength"));
                   }
               }
           }
       });


       component.bind(attr.ID+".ButtonChange",function(change) {
           if (component.role === component.DEFEND_ROLE && !component.input_locked) {
               if (change.newButtons === component.LEFT_BUTTON) {
                   component.body.Dodge(1, "left", 300);
               } else if (change.newButtons === component.RIGHT_BUTTON) {
                   component.body.Dodge(1, "right", 300);
               } else if (change.newButtons === component.BOTH_BUTTONS) {
                   component.body.Block(1, 300)
                  // component.body.KillPlayer(1,1000);
               } else if (change.newButtons === component.NO_BUTTON) {
                   component.body.GoNeutral(1, 300);
               } else {
                   console.log("Is this real life?!");
               }
           }
       });

       component.body.bind("TweenEnd", function(props) {
           console.log("bodyswapping!" + props.tweenName);
           if (props.tweenName === "bodyShift" || props.tweenName === "bodyShiftOut") {
            component.input_locked = false;
           }
       });

       return component;

   },

    swapRole: function(time){
        var component = this;
        this.role = this.role === this.ATTACK_ROLE ? this.DEFEND_ROLE : this.ATTACK_ROLE;
            this.input_locked = true;
            //this.changeAttribute(this.playerID,"CurrentStamina", component.getAttribute(component.playerID,"MaxStamina"));
            if (this.role === this.DEFEND_ROLE) {
                this.setComboRole(false);
                //tween glove2 return right
                this.righty.tween({tweenName: "rightShiftOut", rotation: 0, x: gameSettings.width - 400 + 1000, y: gameSettings.height - 400}, time);
                //tween glove2 return right
                this.lefty.tween({tweenName: "leftShiftOut", rotation: 0, x: -50 + 1000, y: gameSettings.height - 400}, time);

                //set body2 right
                this.body.attr({x: gameSettings.width / 2 - 500 / 2 + 1000, y: 60});

                //tween body2 return left
                this.body.tween({tweenName: "bodyShift", rotation: 0, x: gameSettings.width / 2 - 500 / 2, y: 60}, time);
                //tween glove2 return right

            }

            if (this.role=== this.ATTACK_ROLE) {
                this.setComboRole(true);
                this.righty.punch_out = 0;
                this.lefty.punch_out = 0;
                this.lefty.animate("PunchInAnimate",1);
                this.righty.animate("PunchInAnimate",1);
                //tween body2 return left
                this.body.tween({tweenName: "bodyShiftOut", rotation: 0, x: gameSettings.width / 2 - 500 / 2 - 1000, y: 60}, time);

                //set glove2 left
                this.righty.attr({x: gameSettings.width - 400 - 1000, y: gameSettings.height - 400});
                this.lefty.attr({x: -50 - 1000, y: gameSettings.height - 400});

                //tween glove2 return right
                this.righty.tween({tweenName: "rightShiftBack", rotation: 0, x: gameSettings.width - 400, y: gameSettings.height - 400}, time);
                //tween glove2 return right
                this.lefty.tween({tweenName: "leftShiftBack", rotation: 0, x: -50, y: gameSettings.height - 400}, time);
            }
        }



});