/**
 * Created by myabko on 2014-04-25.
 */
Crafty.c("HitDetector",{
   init: function(){
   },
   detectHit: function(attackZone,defenderZone){
       console.log("detect a hit");
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
           detectedZone = 1 - ((defenderZone - attackZone) / 100);
       }

       if (detectedZone === 0){
            component.trigger("hit.missed");
           console.log("hit missed");
       }
       else {
           component.trigger("hit.landed",detectedZone);
           console.log("hit landed");
       }

       return detectedZone;
   }
});