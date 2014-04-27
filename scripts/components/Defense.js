Crafty.c("Defense",{
    init: function(){
        this.requires('2D, Tween, Zonable, Punch');
    },
    Dodge: function(playerID, direction,time) {
        var component = this;
        //Apply Cost for Dodging
        component.pauseAnimation();
        component.reelPosition(0);
        if (direction === "left"){
            component.setZone(playerID,-50);
            component.tween({tweenName:"dodgeLeft",rotation:0,x: gameSettings.width/2 - 500/2-150, y:80}, time);
            component.animate("DodgeLeftAnimate", 1);
        }else if (direction === "right"){

            component.setZone(playerID,50);
            component.tween({tweenName:"dodgeRight",rotation:0,x: gameSettings.width/2 - 500/2+150, y:80}, time);
            component.animate("DodgeRightAnimate", 1);
        }else{
            console.log("dodged in a direction not governed by reality");
        }
    },



    Block: function(playerID, time){
        var component = this;
        Crafty.trigger("block.start");
        //defender.cancelTween();
        component.tween({tweenName:"blockAction",rotation:0,x: gameSettings.width/2 - 500/2, y:110}, time);
        component.pauseAnimation();
        component.reelPosition(0);
        if (!component.isPlaying("BlockAnimate")) {
            component.animate("BlockAnimate", 1);
        }
        //component.animate("PutinBlockAnimate",1);
    },
    GoNeutral: function (playerID, time) {
        var component = this;
        Crafty.trigger("block.release");
        Crafty.trigger("dodge.release");
        //Is Block = false
        //Remove constant dodge cost

        var oldZone = component.getZone(component.playerID);
        if (oldZone < 0){
            component.setZone(component.playerID,-50);
        } else {
            component.setZone(component.playerID,50);
        }

        //This was an attempt to make the block animation reverse, doesn't work
        if (component.isPlaying("BlockAnimate"))
            component.animate("UnBlockAnimate", 1);
        else{
            //Original return to idle block.
            if (!component.isPlaying("UnBlockAnimate") && !component.isPlaying("IdleAnimate")) {
                component.animate("IdleAnimate", -1);
            }else {
                component.resumeAnimation()
            }
        }
        component.tween({tweenName:"noAction",rotation:0,x: gameSettings.width/2 - 500/2, y:60}, time);
    },
    setNeutralAnimation : function(animationReel){
    },
    setBlockAnimation: function(animationReel) {
    },
    setDodgeAnimation: function(leftAnimation, rightAnimation){
    },
    setDefenderCallbacks: function(){
        var component = this;
        component.bind("TweenEnd", function(props) {
            console.log('here');
            switch (props.tweenName){
                case "dodgeLeft":
                    Crafty.trigger("dodge.end");
                    //apply constant dodge cost
                    component.setZone(component.playerID,-100);
                    break;
                case "dodgeRight":
                    //apply constant dodge cost
                    Crafty.trigger("dodge.end");
                    component.setZone(component.playerID,100);
                    break;
                case "noAction":
                    //Crafty.trigger("block.release"); redundant
                    //Crafty.trigger("dodge.release");
                    component.setZone(component.playerID,0);
                    break;
                case "blockAction":
                    Crafty.trigger("block.end");
                    //Is Blocking = true
                    component.setZone(component.playerID,0);
                    break;
            }
        });

        return component;
    }

});