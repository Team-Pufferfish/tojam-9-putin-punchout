Crafty.c("Defense",{
    init: function(){
        this.requires('2D, Tween');
    },
    Dodge: function(playerID, direction,time) {
        var component = this;

        console.log("dodged " + direction + " for " + time )
        Crafty.trigger("dodge.start", {"direction": direction})
        component.pauseAnimation();
        component.reelPosition(0);
        if (direction === "left"){
            component.tween({tweenName:"dodgeLeft",rotation:0,x: gameSettings.width/2 - 462/2-150, y:60}, time);
            //defender.animate("DodgeLeft");
        }else if (direction === "right"){
            component.tween({tweenName:"dodgeRight",rotation:0,x: gameSettings.width/2 - 462/2+150, y:60}, time);
            //defender.animate("DodgeRight");
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
        if (!component.isPlaying("PutinBlockAnimate")) {
            component.animate("PutinBlockAnimate", 1);
        }
        //component.animate("PutinBlockAnimate",1);
    },
    GoNeutral: function (playerID, time) {
        var component = this;
        Crafty.trigger("block.release");
        Crafty.trigger("dodge.release");
        //defender.cancelTween();

        //This was an attempt to make the block animation reverse, doesn't work
        if (component.isPlaying("PutinBlockAnimate"))
            component.animate("PutinUnblockAnimate", 1);
        else{
            //Original return to idle block.
            if (!component.isPlaying("PutinUnblockAnimate") && !component.isPlaying("PutinIdleAnimate")) {
                component.animate("PutinIdleAnimate", -1);
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
    setCallbacks: function(){
        var component = this;
        component.bind("TweenEnd", function(props) {
            console.log("A Tween ended" + props);
            switch (props.tweenName){
                case "dodgeLeft": console.log("dodged left!");Crafty.trigger("dodge.end"); break;
                case "dodgeRight": console.log("dodge right!");Crafty.trigger("dodge.end"); break;
                case "noAction": console.log("standing around like an idiot"); Crafty.trigger("block.end");Crafty.trigger("dodge.end"); break;
                case "blockAction": console.log("block ready!"); Crafty.trigger("block.end");break;
            }
        });
    }

});