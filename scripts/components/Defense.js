Crafty.c("Defense",{
    init: function(){
        this.requires('2D, Tween, Zonable, Punch,SoundsEffect');
    },
    Dodge: function(playerID, direction,time) {

        Crafty.trigger("block.release");
        var component = this;
        //Apply Cost for Dodging
        component.pauseAnimation();
        component.reelPosition(0);
        Crafty.audio.play('dodgeSwoosh',1,0.3);
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
        component.pauseAnimation();
        //component.reelPosition(0);
        if (!component.isPlaying("BlockAnimate")&&!component.isPlaying("UnDodgeRightBlockAnimate")) {
            if (component.getZone(component.playerID) === 100) {
                component.animate("UnDodgeRightBlockAnimate", 1);
                component.setZone(component.playerID,50);
            }else if (component.getZone(component.playerID) === -100) {
                component.animate("UnDodgeLeftBlockAnimate", 1);
                component.setZone(component.playerID,-50);
            }else {
                component.setZone(component.playerID,0);
                component.animate("BlockAnimate", 1);
            }
        }
        component.tween({tweenName:"blockAction",rotation:0,x: gameSettings.width/2 - 500/2, y:110}, time);
    },
    GoNeutral: function (playerID, time) {
        var component = this;
        Crafty.trigger("block.release");
        Crafty.trigger("dodge.release");
        //Remove constant dodge cost

        if (component.isBlocking){
            component.isBlocking = false;
            component.animate("UnBlockAnimate", 1);
        }else{

        var oldZone = component.getZone(component.playerID);
        if (oldZone < 0){
            if (oldZone === -100)
                component.animate("UnDodgeLeftAnimate", 1);
            component.setZone(component.playerID,-50);
        } else if (oldZone === 100){
                component.animate("UnDodgeRightAnimate", 1);
            component.setZone(component.playerID,50);
        }else
        {
           component.animate("IdleAnimate", -1);
        }
        }
        component.tween({tweenName:"noAction",rotation:0,x: gameSettings.width/2 - 500/2, y:60}, time);
    },
    StunPlayer: function(playerID, time){
        var component = this;
        console.log("stun animation start");
        Crafty.trigger("block.release");
        Crafty.trigger("dodge.release");
        component.setZone(component.playerID,0);
        component.animate("StunAnimate", 1);

        component.tween({tweenName:"stunned",rotation:0,x: gameSettings.width/2 - 500/2, y:60}, time);
    },
    KillPlayer: function(playerID, time){
        var component = this;
        Crafty.trigger("block.start");
        //defender.cancelTween();
        component.pauseAnimation();
        //component.reelPosition(0);
      component.animate("DieAnimate", 1);

        component.tween({tweenName:"dieAction",rotation:25,x:component.x, y:700}, time);
    },
    setDefenderCallbacks: function(){
        var component = this;
        component.bind("TweenEnd", function(props) {
            console.log('here');
            switch (props.tweenName){
                case "dodgeLeft":
                    Crafty.trigger("dodge.end");
                    console.log("dodgeleft");
                    //apply constant dodge cost
                    component.setZone(component.playerID,-100);
                    break;
                case "dodgeRight":
                    //apply constant dodge cost
                    console.log("dodgeright");
                    Crafty.trigger("dodge.end");
                    component.setZone(component.playerID,100);
                    break;
                case "noAction":
                    //Crafty.trigger("block.release"); redundant
                    //Crafty.trigger("dodge.release");
                    component.animate("IdleAnimate", -1);
                    component.setZone(component.playerID,0);
                    break;
                case "stunned":
                    //Crafty.trigger("block.release"); redundant
                    //Crafty.trigger("dodge.release");
                    //component.GoNeutral(component.playerID,300);
                    component.setZone(component.playerID,0);
                    break;
                case "blockAction":
                    Crafty.trigger("block.end");
                    component.isBlocking = true;
                    component.setZone(component.playerID,0);
                    break;
            }
        });

        return component;
    }

});