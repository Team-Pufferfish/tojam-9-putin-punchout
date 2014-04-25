Crafty.c("Defense",{
    init: function(){
        this.requires('2D, Tween');
    },
    Dodge: function(playerID, direction,time) {
        var component = this;

        console.log("dodged " + direction + " for " + time )
        Crafty.trigger("dodge.start", {"direction": direction})
        //defender.cancelTween();
        if (direction === "left"){
            component.tween({tweenName:"dodgeLeft",rotation:0,x: -150, y: 0}, time);
            //defender.animate("DodgeLeft");
        }else if (direction === "right"){
            component.tween({tweenName:"dodgeRight",rotation:0,x: +150, y: 0}, time);
            //defender.animate("DodgeRight");
        }else{
            console.log("dodged in a direction not governed by reality");
        }
    },
    Block: function(playerID, time){
        var component = this;
        Crafty.trigger("block.start");
        //defender.cancelTween();
        component.tween({tweenName:"blockAction",rotation:0,x: 0, y: 50}, time);
        //defender.animate("BlockAnimation");
    },
    GoNeutral: function (playerID, time){
        var component = this;
        Crafty.trigger("block.release");
        Crafty.trigger("dodge.release");
        //defender.cancelTween();
        //defender.animate("Neutral",-1);
        component.tween({tweenName:"noAction",rotation:0,x: 0, y: 0}, time);
    },
    setNeutralAnimation : function(animtionReel){
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