/**
 * Created by myabko on 2014-04-25.
 */
Crafty.c("HitDetector",{
   init: function(){

       var isBlocking = false;


       Crafty.bind("block.end",function(){
           isBlocking = true;
           console.log("hit detector found a block");
       });

       Crafty.bind("block.release",function(){
           isBlocking = false;
           console.log("hit detector found a end block");
       })



       this.detectHit = function(attackZone,defenderZone){
           var component = this;
           var detectedZone;
           if (Math.abs(defenderZone - attackZone) >= 100){
               detectedZone =  0;
           }
           else {
               if (attackZone < 0 && defenderZone < 0) {
                   attackZone = Math.abs(attackZone);
                   defenderZone = Math.abs(defenderZone);

               }
               detectedZone = 1 - (Math.abs(defenderZone - attackZone) / 100);
           }

           if (detectedZone === 0){
               component.trigger("hit.missed");
               return {
                   result: "missed",
                   hitPercent: detectedZone
               }
           }
           else if (isBlocking){
               component.trigger("hit.blocked",detectedZone);
               return {
                   result: "blocked",
                   hitPercent: detectedZone
               }
           }
           else {
               component.trigger("hit.landed",detectedZone);
               return {
                   result: "landed",
                   hitPercent: detectedZone
               }
           }

           return detectedZone;
       }

   },
   detectHit: undefined
});