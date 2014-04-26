/**
 * Created by myabko on 2014-04-26.
 */
Crafty.c("Player",{
   init: function(){
       this.requires('LRController,Attributes,Graphics,Zonable,Defense,Punch');
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
               .setCallbacks()
               .attr("playerID", attr.ID);
           component.lefty = Crafty.e('Graphics, Punch, BoxingGlove,' + attr.GloveSpriteName)
               .attr({punch_out: 0, rotation: 0, x: -50 + component.role * 1000, y: gameSettings.height - 400, z: 100})
               .flip("X")
               .origin("center")
               .setPunchAnimation(true)
               .setCallbacks();
           component.righty = Crafty.e('Graphics, Punch, BoxingGlove,' + attr.GloveSpriteName)
               .attr({punch_out: 0, rotation: 0, x: gameSettings.width - 400 + component.role * 1000, y: gameSettings.height - 400, z: 100})
               .origin("center")
               .setPunchAnimation(true)
               .setCallbacks();
       }

       function setupStats(){
           if (!stats){
               stats = {
                   MaxStamina : 1000,
                   CurrentStamina: 1000,
                   TotalStamina: 1000,
                   StaminaRegenRate: 10,
                   PunchStrength: 50

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

       function setupOffensiveStamina() {

           if (component.role === component.ATTACK_ROLE){

               function triggerAction(e){
                   /* component.trigger("punch.end",{
                    punchType: e.punchType,
                    hand: e.hand,
                    damage: hitPercent * e.strength,
                    result: result
                    });*/
                   var cStam = component.getAttribute(attr.opponentID,"CurrentStamina");
                   if (cStam > 0){

                       var damageToDeal = e.damage;

                       if (cStam - e.damage < 0){
                           damageToDeal = cStam;
                       }

                       component.changeAttribute(attr.opponentID,"CurrentStamina", -(damageToDeal));

                       console.log("CSTAM:",cStam);
                   } else {
                       console.log('it goes here');
                       component.changeAttribute(attr.opponentID,"MaxStamina", -(e.damage));
                   }

               }

               component.lefty.bind("punch.end",triggerAction);
               component.righty.bind("punch.end",triggerAction);

           }



           component.bind(attr.opponentID + ".attribute.changed",function(e){
               /* component.trigger(ID + ".attribute.changed",{
                name: attributeName,
                oldValue: oldVal,
                newValue: newVal

                });*/
               if (e.name === "CurrentStamina"){
                   console.log("CurrentStaminaNew: ", e.newValue, "Old: ", e.oldValue);
               }
               if (e.name === "MaxStamina"){
                   console.log("MaxStaminaNew: ", e.newValue, "Old: ", e.oldValue);
               }
           });
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
                   component.body.Dodge(1, "left", 200);
               } else if (change.newButtons === component.RIGHT_BUTTON) {
                   component.body.Dodge(1, "right", 200);
               } else if (change.newButtons === component.BOTH_BUTTONS) {
                   component.body.Block(1, 200)
               } else if (change.newButtons === component.NO_BUTTON) {
                   component.body.GoNeutral(1, 200);
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
        this.role = this.role === this.ATTACK_ROLE ? this.DEFEND_ROLE : this.ATTACK_ROLE;
            this.input_locked = true;
            if (this.role === this.DEFEND_ROLE) {
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