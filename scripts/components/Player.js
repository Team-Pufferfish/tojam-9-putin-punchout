/**
 * Created by myabko on 2014-04-26.
 */
Crafty.c("Player",{
   init: function(){
       this.requires('LRController,Attributes,Graphics,Zonable,Defense');
   },

   ATTACK_ROLE: 0,
   DEFEND_ROLE: 1,
   role: -1,

   setup: function(attr) {
       var component = this;

       /* attr variable
       ID -- playerID
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

       console.log('role is: ',component.role);
       component.role = attr.role;
       console.log('now role is: ',component.role);
       //Command Support

       var bodysprite = Crafty.e("Graphics,Zonable, Defense,Boxer,"+attr.BodySpriteName)
           .attr({rotation:0,x: gameSettings.width/2 - 500/2 + component.role*1000 - 1000 , y:60})
           .origin("center")
           .animate("IdleAnimate",-1);
       bodysprite.setCallbacks();
       bodysprite.attr("playerID",attr.ID);

       var lefty = Crafty.e('Graphics, Punch, BoxingGlove,'+attr.GloveSpriteName)
           .attr({punch_out:0,rotation:0,x:-50 + component.role*1000, y: gameSettings.height - 450})
           .flip("X")
           .origin("center");
       lefty.setPunchAnimation(true);
       lefty.setCallbacks();

       var righty = Crafty.e('Graphics, Punch, BoxingGlove,'+attr.GloveSpriteName)
           .attr({punch_out:0,rotation:0,x: gameSettings.width-400 + component.role*1000, y: gameSettings.height - 450})
           .origin("center");
       righty.setPunchAnimation(true);
       righty.setCallbacks();



       component.bind(attr.ID+".ButtonComplete",function(change) {
console.log("this component has a role of:",component.role);
           if (component.role === component.ATTACK_ROLE) {
               console.log("attacker  " + JSON.stringify(change));
               if (change.button === component.LEFT_BUTTON && lefty.punch_out === 0 && righty.punch_out != 2) {
                   if (change.timeHeld <= 350) {
                       console.log("jab:" + change.timeHeld);
                       lefty.ThrowPunch("pID", "dID", lefty.STRAIGHT, lefty.LEFT_PUNCH, 0, 100);
                   } else {
                       console.log("hook:" + change.timeHeld);
                       lefty.ThrowPunch("pID", "dID", lefty.HOOK, lefty.LEFT_PUNCH, 0, 100);
                   }
               } else if (change.button === component.RIGHT_BUTTON && righty.punch_out === 0 && lefty.punch_out != 2) {
                   if (change.timeHeld <= 350) {
                       righty.ThrowPunch("pID", "dID", righty.STRAIGHT, righty.RIGHT_PUNCH, 0, 100);
                   } else {
                       console.log("hook:" + change.timeHeld);
                       righty.ThrowPunch("pID", "dID", righty.HOOK, righty.RIGHT_PUNCH, 0, 100);
                   }
               }
           }
       });


       component.bind(attr.ID+".ButtonChange",function(change) {
           if (component.role === component.DEFEND_ROLE) {
               console.log("defender  " + JSON.stringify(change));
               if (change.newButtons === component.LEFT_BUTTON) {
                   console.log("go left");
                   bodysprite.Dodge(1, "left", 200);
               } else if (change.newButtons === component.RIGHT_BUTTON) {
                   console.log("go right");
                   bodysprite.Dodge(1, "right", 200);
               } else if (change.newButtons === component.BOTH_BUTTONS) {
                   console.log("go block");
                   bodysprite.Block(1, 200)
               } else if (change.newButtons === component.NO_BUTTON) {
                   console.log("no block");
                   bodysprite.GoNeutral(1, 200);
               } else {
                   console.log("Is this real life?!");
               }
           }
       });

   },

    swapRole: function(){
        this.role = this.role === this.ATTACK_ROLE ? this.DEFEND_ROLE : this.ATTACK_ROLE;
    }

});