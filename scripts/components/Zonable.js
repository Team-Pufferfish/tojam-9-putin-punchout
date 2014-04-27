/**
 * Created by myabko on 2014-04-25.
 */
Crafty.c("Zonable",{
    init: function(){
        this.requires("Attributes")
    },

    setZone: function(playerID,zone){

        var component = this;


        if (zone === null || zone > 100 || zone < -100){
            throw new Error("cannot set zone");
        } else {
            //set zone here
            var oldZone;
            try {
                oldZone = component.getAttribute(playerID,"zone");
            }
            catch (e){
                oldZone = 0;
            }

            console.log("oldzone:",oldZone," newzone:",zone);
            component.trigger(playerID + ".zoneChange",{
                oldZone: oldZone,
                newZone: zone
            });
            component.assignAttribute(playerID,"zone",zone);
        }

      //  console.log(playerID,"new zone:",zone);



    },

    getZone: function(playerID){

        var component = this;
        var zoneToReturn;
        try {
            zoneToReturn = component.getAttribute(playerID,"zone");
        } catch (e){
            return 0;
        }
        return zoneToReturn;
    }
});
