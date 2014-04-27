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
        return this;
    },
    setCallbacks: function() {
        var component = this;
        //on end animation call this
        component.bind("punch.ending",function(e){
            var attackerZone = e.punchType * e.hand;
            var defenderZone = component.getZone(e.defenderID);
            var hitPercent = component.detectHit(attackerZone,defenderZone);
            var result = hitPercent === 0 ? component.PUNCH_MISS : component.PUNCH_HIT;

            console.log("punch result: ",result, " damage: ",hitPercent * e.strength);

            //Substract stamina from attacker bsed on hit or miss

            component.trigger("punch.end",{
                punchType: e.punchType,
                hand: e.hand,
                damage: hitPercent * e.strength,
                result: result
            });
        });

        component.bind("TweenEnd", function(props) {
            if (props.tweenName === "rightPunch") {
                component.trigger("punch.ending",props.triggerData);
                this.punch_out = 1;
                component.animate("PunchInAnimate",1);
                this.tween({tweenName:"rightReturn",rotation: 0, x: gameSettings.width-400, y: gameSettings.height - 400}, 200);
            }else if (props.tweenName === "rightReturn"){
                this.punch_out = 0;
            }else if (props.tweenName === "leftPunch") {
                component.trigger("punch.ending",props.triggerData);
                this.punch_out = 1;
                component.animate("PunchInAnimate",1);
                this.tween({tweenName:"leftReturn",rotation: 0, x: -50, y: gameSettings.height - 400}, 200);
            }else if (props.tweenName === "leftReturn"){
                this.punch_out = 0;
            }
        });
        return component;
    },
    ThrowPunch: function(playerID, defenderID,punchType,hand,zone,strength){
        var triggerData = {
            playerID: playerID,
            defenderID: defenderID,
            punchType: punchType,
            hand: hand,
            strength: strength
        };
        var component = this;
            Throw();

        function Throw(){

            component.trigger("punch.start",{
                type: punchType,
                hand: hand,
                strength: strength
            });

            if (component.ShouldAnimate){
                animate(component);
            } else {//tests only

                component.trigger("punch.ending", triggerData);
            }
        }

        function animate(component) {
            component.punch_out = 2;
            component.animate("PunchOutAnimate", 1);
            if (hand === component.LEFT_PUNCH) {
                if (punchType === component.STRAIGHT) {
                    component.tween({tweenName: "leftPunch", rotation: 0, x: 50, y: gameSettings.height - 450, triggerData: triggerData}, 200);//, x: gameSettings.width / 2 - 50, y: 50}, 200);
                }else{
                    component.tween({tweenName: "leftPunch", rotation: 15, x: gameSettings.width * 0.2, y: gameSettings.height - 450, triggerData: triggerData}, 200);
                }
            }else if (hand === component.RIGHT_PUNCH) {
                if (punchType === component.STRAIGHT) {
                    component.tween({tweenName: "rightPunch", rotation: 0,x:gameSettings.width-530,y: gameSettings.height - 450, triggerData: triggerData},200);//, x: gameSettings.width / 2 - 150, y: 50}, 200);
               }else {
                    component.tween({tweenName: "rightPunch", rotation: -15, x: gameSettings.width * 0.2,y: gameSettings.height - 450, triggerData: triggerData}, 200);
               }
            }
        }
    }
});