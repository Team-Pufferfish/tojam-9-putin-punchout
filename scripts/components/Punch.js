/**
 * Created by myabko on 2014-04-25.
 */
Crafty.c("Punch",{
    init: function(){
        this.requires("HitDetector,Zonable");
    },
    STRAIGHT: 25,
    HOOK: 100,
    LEFT_PUNCH: 1,
    RIGHT_PUNCH: -1,
    ShouldAnimate: false,
    PUNCH_HIT: 1,
    PUNCH_MISS: 0,
    PUNCH_BLOCK: 2,
    setPunchAnimation: function(shouldAnimate){
        this.ShouldAnimate = shouldAnimate;
        console.log("should animate: "+shouldAnimate);
        return this;
    },
    setCallbacks: function() {
        var component = this;
        //on end animation call this
        component.bind("punch.ending",function(){
            console.log("punch is ending");
            var attackerZone = punchType * hand;
            var defenderZone = component.getZone(defenderID);
            console.log("punch.ending");
            component.detectHit(attackerZone,defenderZone);

        });
        component.bind("hit.landed",function(e){
            console.log("punch hit");
            component.trigger("punch.end",{
                punchType: punchType,
                hand:hand,
                damage: e * strength,
                result: component.PUNCH_HIT
            });
        });

        component.bind("hit.missed",function(){
            console.log("punch missed");
            component.trigger("punch.end",{
                punchType: punchType,
                hand:hand,
                damage: 0,
                result: component.PUNCH_MISS
            });
        });

        component.bind("TweenEnd", function(props) {
            console.log("punch tween completed: " + props.tweenName);
            if (props.tweenName === "rightPunch") {
                //component.trigger("punch.ending");
                component.animate("PunchInAnimate",1);
                this.tween({tweenName:"rightReturn",rotation: 0, x: gameSettings.width-400, y: gameSettings.height - 450}, 200);
            }else if (props.tweenName === "rightReturn"){
                this.punch_out = 0;
            }else if (props.tweenName === "leftPunch") {
                //component.trigger("punch.ending");
                component.animate("PunchInAnimate",1);
                this.tween({tweenName:"leftReturn",rotation: 0, x: -50, y: gameSettings.height - 450}, 200);
            }else if (props.tweenName === "leftReturn"){
                this.punch_out = 0;
            }
        });
    },
    ThrowPunch: function(playerID, defenderID,punchType,hand,zone,strength){

        var component = this;

        if (component.punch_out === 0)
            Throw();

        function Throw(){

            component.trigger("punch.start",{
                type: punchType,
                hand: hand,
                strength: strength
            });

            if (component.ShouldAnimate){
                animate(component);
                console.log("starting animate");
            } else {//tests only
                console.log("triggering punch.ending");
                component.trigger("punch.ending");
            }
        }

        function animate(component){
            component.punch_out = 1;
            component.animate("PunchOutAnimate",1);
            if (hand === component.LEFT_PUNCH)
                if (punchType === component.STRAIGHT)
                    component.tween({tweenName: "leftPunch", rotation: 0},200);//, x: gameSettings.width / 2 - 50, y: 50}, 200);
                else
                    component.tween({tweenName: "leftPunch", rotation: 25},200);//, x: gameSettings.width / 2 + 50, y: 50}, 200);
            else if (hand === component.RIGHT_PUNCH) {
                if (punchType === component.STRAIGHT) {
                    component.tween({tweenName: "rightPunch", rotation: 0},200);//, x: gameSettings.width / 2 - 150, y: 50}, 200);
                }else {
                    component.tween({tweenName: "rightPunch", rotation: -25},200);//, x: gameSettings.width / 2 - 250, y: 50}, 200);
                }
            }
        }
    }
});